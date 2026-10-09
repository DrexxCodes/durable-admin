import React, { useContext, useEffect, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import Container from "@/components/ui/Container";
import { ModalComponents } from "@/features";
import { GlobalState } from "@/Data/Context";
import { Buttons, EmptyComponent } from "@/Utils";
import { useNavigate } from "@/lib/router";

const ManageProducts = () => {
  let { setStateName, toggleAvailabilty, permission, auth } = useContext(GlobalState);
  useEffect(() => {
    setStateName("Product Control");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [isOpenInit, setIsOpenInit] = useState(false),
    toggleInit = () => {
      setIsOpenInit(!isOpenInit);
    },
    [loading, setLoading] = useState(""),
		navigate = useNavigate();

	useEffect(() => {
		if (auth?.user?.privilege !== "superadmin") {
			let findTitle = "viewmanageproduct";

			let findPermit = permission?.data?.find(
				item =>
					item?.slug === findTitle && item?.user?.includes(auth?.user?._id)
			);
			if (!findPermit) {
				navigate(-1);
			}
		}
	}, [auth?.user, permission?.data, navigate]);

  return (
    <div className="bg-white aboutScreen">
      <Container className="py-5">
        <h4 className="Lexend">All products</h4>{" "}
        <div className="btn-group">
          <Buttons
            title={"create new"}
            css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0"
            width={"w-auto"}
            onClick={toggleInit}
            style={{ borderRadius: "30px" }}
          />
          <Buttons
            title={"disable all"}
            css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0 mx-1 mx-md-2"
            width={"w-auto"}
            onClick={async () => {
              setLoading("disable");
              await toggleAvailabilty("product", "disable");
              setLoading("");
            }}
            loading={loading === "disable"}
            style={{ borderRadius: "30px" }}
          />
          <Buttons
            title={"enable all"}
            css="btn-primary1 text-capitalize py-md-3 py-2 px-4 px-lg-5 my-md-4 my-2 mb-0 mx-1 mx-md-2"
            width={"w-auto"}
            onClick={async () => {
              setLoading("enable");
              await toggleAvailabilty("product", "enable");
              setLoading("");
            }}
            loading={loading === "enable"}
            style={{ borderRadius: "30px" }}
          />
        </div>
        <ProductDetails />
      </Container>{" "}
      <MakeProduct isOpen={isOpenInit} back={toggleInit} />
    </div>
  );
};

export default ManageProducts;

const ProductDetails = () => {
  let { products, manageProducts } = useContext(GlobalState),
    [state, setState] = useState(null),
    [load, setLoad] = useState({ isLoad: false, loadData: "" }),
    [load2, setLoad2] = useState({ isLoad: false, loadData: "" });
  let [deleteModal, setDeleteModal] = useState(false);
  let [productItem, setProductItem] = useState("");

  useEffect(() => {
    if (products?.isFound) setState(products?.mainSearch);
    else setState(products?.data);
  }, [products?.mainSearch, products?.isFound, products?.data]);

  const deleteProduct = async (item) => {
    setLoad2({ isLoad: true, loadData: item?._id });
    await manageProducts(item, item?._id, "delete");
    setLoad2({ isLoad: false, loadData: "" });
  };

  const confirmDelete = (item) => {
    setDeleteModal(!deleteModal);
    if (item) {
      setProductItem(item);
    }
  };

  if (!state) return;

  return (
    <>
      <div className="pb-5 my-5">
        <div className="bland row mx-0 py-3 px-0 text-capitalize Lexend fw-bold">
          <div className="col textTrunc Lexend">S/N</div>
          <div className="col textTrunc Lexend">name</div>
          <div className="col textTrunc Lexend">sub category</div>
          <div className="col textTrunc Lexend">status</div>
          <div className="col textTrunc Lexend">action </div>
        </div>
        <div className="bg-white row mx-0">
          {state?.length === 0 ? (
            <EmptyComponent subtitle={"Product state empty"} />
          ) : (
            state?.map((item, index) => (
              <div key={index} className="row mx-0 py-3 px-0 border-bottom">
                <div className="col textTrunc my-auto">{index + 1}</div>
                <div className="col textTrunc my-auto text-uppercase">
                  {item?.name}
                </div>
                <div className="col textTrunc my-auto">
                  {item?.subCategory?.length}
                </div>
                <div
                  className={`col textTrunc my-auto ${
                    item?.enabler === "enable"
                      ? "text-success text-success2"
                      : "text-danger text-danger2"
                  }`}
                >
                  {item?.enabler}d
                </div>
                <div className="col textTrunc my-auto btn-group">
                  <button
                    onClick={async () => {
                      setLoad({ isLoad: true, loadData: item?._id });
                      await manageProducts(
                        {
                          ...item,
                          enabler:
                            item?.enabler === "enable" ? "disable" : "enable",
                        },
                        item?._id,
                        "edit"
                      );
                      setLoad({ isLoad: false, loadData: "" });
                    }}
                    className="btn btn-primary1 text-capitalize p-1 p-md-2 w-100 fontReduce2"
                  >
                    {load?.isLoad && load?.loadData === item?._id ? (
                      <ClipLoader color="white" size={16} />
                    ) : item?.enabler === "enable" ? (
                      <HiThumbDown />
                    ) : (
                      <HiThumbUp />
                    )}
                  </button>
                  <button
                    onClick={() => confirmDelete(item)}
                    className="btn btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2"
                  >
                    {load2?.isLoad && load2?.loadData === item?._id ? (
                      <ClipLoader color="white" size={16} />
                    ) : (
                      <BiTrashAlt />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ModalComponents
        title={"Confirm delete"}
        isOpen={deleteModal}
        toggle={confirmDelete}
      >
        <div className="downH2 d-flex flex-column align-items-center">
          <div className="my-auto w-100">
            <p className="text2 Lexend text-center">
              Are you sure you want to delete?
            </p>
            <div className="w-100 d-flex">
              <div className="btn-group mx-auto w-50">
                <button
                  className="btn btn-success2 text-uppercase py-3"
                  onClick={() => deleteProduct(productItem)}
                >
                  yes
                </button>
                <button
                  className="btn btn-danger text-uppercase py-3"
                  onClick={confirmDelete}
                >
                  no
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalComponents>
    </>
  );
};

const MakeProduct = ({ isOpen, back, datum }) => {
  const { products, manageProducts } = useContext(GlobalState);
  let init = { name: "" },
    [data, setThisData] = useState(init);

  let [newLoad, setNewLoad] = useState(false),
    [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (datum) {
      setThisData(datum);
    }
  }, [datum]);

  let handleSubmit = async (e) => {
    e?.preventDefault();
    if (!data?.name) return;

    setNewLoad(true);
    datum?._id
      ? await manageProducts(data, datum?._id, "edit")
      : await manageProducts(data);
    setNewLoad(false);
    setSubmit(true);
  };

  useEffect(() => {
    if (submit && products?.isAdded) {
      setSubmit(false);
      setThisData(init);
      back();
    }
    if (submit && products?.isUpdated) {
      setSubmit(false);
      setThisData(init);
      back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit, products?.isAdded, products?.isUpdated]);

  return (
    <ModalComponents
      title={datum ? "Update Product" : "Add product"}
      isOpen={isOpen}
      toggle={back}
    >
      <>
        <div className="mb-4">
          <label htmlFor="Name">Product name</label>
          <input
            type="text"
            className="form-control py-3"
            value={data?.name}
            onChange={(e) => setThisData({ ...data, name: e.target.value })}
            placeholder="Product name"
          />
        </div>
        <Buttons
          title={datum ? "update" : "create"}
          css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto my-4"
          width={"w-50 w50"}
          onClick={handleSubmit}
          loading={newLoad}
        />
      </>
    </ModalComponents>
  );
};

// const confirmDelete = ({ isOpen, back }) => {
//   return (
//     <>
//       <ModalComponents
//         isOpen={isOpen}
//         back={back}
//         title="Are you sure you want to delete?"
//       >

// 	  </ModalComponents>
//     </>
//   );
// };
