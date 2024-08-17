import React, {useState} from 'react';
import {Head, Link, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import PageLink from "@/Components/Srceen/pagelink";
import CustomPagination from "@/Components/SearchPagination/CustomPagination";
import SearchAndFilter from "@/Components/SearchPagination/SearchAndFilter";
import {errorMessage, infoMessage, labelNameRSt, successMessage, ucwords, useInternalLink} from "@/Library/Helper";
import '@fortawesome/fontawesome-free/css/all.min.css';
import DropdownActionButton from "@/Components/FormShare/DropdownActionBtn";
import ProductViewModel from "@/Pages/Backend/Products/ProductViewModel";
import VirtualAlert from "@/Library/VirtualAlert";


export default function ProductList ({ products}) {
    const virtualAlert = new VirtualAlert()
    const product = products.data
    var route_link = "product_list.index"
    // console.log(product);

    const [isLoading,setIsLoading] = useState(false);
    const [productIdData,setProductIdData] = useState(false);

    const { get,delete: destroy} = useForm({
    });

    const stokHandle =(row)=>{
        let instock
        if (row.in_stock=="1"){
            instock = <span className="badge bg-success mr-2"> Yes</span>
        }else{
            instock = <span className="badge bg-warning mr-2"> No</span>
        }
        let status
        if (row.status=="1"){
            status = <span className="badge bg-info mr-2"> Active</span>
        }else{
            status = <span className="badge bg-danger mr-2"> Inactive</span>
        }
        return (
            <>
                {instock}<br/>
                {status}
            </>
        )
    }
    const hotProductHandle =(row)=>{
        if (row.hot_product=="1"){
            return (
                <span className="badge bg-success mr-2"> Yes</span>
            )
        }else{
            return (
                <span className="badge bg-warning mr-2"> No</span>
            )
        }
    }
    const colorHandle = (row) =>{
        const colorsString = row?.colors;
        if (colorsString){
            const colorsArray = colorsString.split(",");
            return colorsArray.map(item => (
                <span key={item} className="badge bg-primary m-1">{item}</span>
            ));
        }
    }
    const tagHandle = (row) =>{
        const colorsString = row?.tags;
        if (colorsString){
            const colorsArray = colorsString.split(",");
            return colorsArray.map(item => (
                <span key={item} className="badge bg-info m-1">{item}</span>
            ));
        }
    }
    const sizeHandle = (row) =>{
        const colorsString = row?.size;
        if (colorsString){
            const colorsArray = colorsString.split(",");
            return colorsArray.map(item => (
                <span key={item} className="badge bg-success m-1">{item}</span>
            ));
        }
    }

    //toggle view btn
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const handleToggle = (id) => {
        setOpenDropdownId(prevState => (prevState === id ? null : id));
    };

    const handleEditAction = (action, id) => {
        if (action=="edit"){
            get(route('product_list.edit',id))
        };

        if (action=="view"){
            setProductIdData(id)
            setModalInfo({ isOpen: true, action, id });
        };
        if (action=="delete"){
            setProductIdData(id)
            DeleteHandler(id)
        };
    };

    const DeleteHandler = async (id) =>{
        let {isConfirmed} = await virtualAlert.confirmAlert(`Are you sure?`, `Once you delete this you can't able to recover this data`);
        if (isConfirmed) {
            destroy(route('product_list.destroy',id), {
                onStart: () => {
                    setIsLoading(true)
                    infoMessage("Product Delete Process")
                },
                onSuccess: (data) => {
                    setIsLoading(false)
                    successMessage("Product Delete Success");
                },
                onError: () => {
                    setIsLoading(false)
                    console.log("data error");
                    errorMessage("Product Delete Not Success !")
                }
            });
        }
    }

    const [modalInfo, setModalInfo] = useState({ isOpen: false, action: '', id: null });
    const handleCloseModal = () => {
        setModalInfo({ isOpen: false, action: '', id: null });
    };

    const HtmlContent = (trending) => {
        const content = trending || '';
        return (
            <span dangerouslySetInnerHTML={{ __html: content }} />
        );
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Product list" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />

                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Product Lists"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <Link className="btn btn-primary btn-sm mr-2 mb-2" href={route('add_product.create')}>
                                            <i className="las la-plus"></i> &nbsp; Add Products
                                        </Link>
                                    </div>
                                    <SearchAndFilter maindata={products} route_link={route_link}/>
                                    <div className="card-body" style={{padding:'5px'}}>
                                        <div className="table-responsive ">
                                            <table className="table table-bordered table-sm text-center table-striped">
                                                <thead className="thead-dark">
                                                <tr>
                                                    <th className="text-center">SL</th>
                                                    <th className="text-center">Product</th>
                                                    <th className="text-center">Description</th>
                                                    <th className="text-center">{ucwords("cat-Sub")}</th>
                                                    <th className="text-center">{ucwords("color,Size,Tag")}</th>
                                                    <th className="text-center">{labelNameRSt("price")}</th>
                                                    {/*<th className="text-center">{labelNameRSt("discount")}</th>*/}
                                                    <th className="text-center">{labelNameRSt("stock")}</th>
                                                    <th className="text-center">{labelNameRSt("hot -P")}</th>
                                                    <th className="text-center">{labelNameRSt("make by")}</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {product.map((row,i)=>(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <img src={useInternalLink(row?.product_image?.featured_image)} alt="image" className="rounded-2 avatar avatar-55 img-fluid"/>
                                                                <div className="d-flex flex-column ms-3 justify-content-center ml-2" style={{fontSize:'14px',textAlign:'left'}}>
                                                                    <h6 className="text-capitalize">{row?.name}</h6>
                                                                    <span className="badge bg-success mr-2">{row.sku?row.sku:""}</span>
                                                                    <small className="text-capitalize">{row.slug?row.slug:""}</small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{fontSize:'12px'}}>{HtmlContent(row?.description)}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="d-flex flex-column ms-3 justify-content-center" style={{fontSize:'14px',textAlign:'left'}}>
                                                                    <span className="badge bg-success mb-1">{row.categorie?row?.categorie?.name:""}</span>
                                                                    <span className="badge bg-primary mb-1">{row.sub_categorie?row?.sub_categorie?.name:""}</span>
                                                                    <span className="badge bg-info mb-1">{row.sub_sub_category?row?.sub_sub_category?.name:""}</span>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="d-flex flex-column ms-3 justify-content-center" style={{fontSize:'14px',textAlign:'left'}}>
                                                                    <div>{colorHandle(row)}</div>
                                                                    <div> {sizeHandle(row)}</div>
                                                                    <div> {tagHandle(row)}</div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="d-flex">
                                                                <div className="d-flex flex-column ms-3 justify-content-center" style={{fontSize:'14px',textAlign:'left'}}>
                                                                    <div>R-P : {row?.regular_price}</div>
                                                                    <div>S-A : {row?.sale_price}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/*<td>*/}
                                                        {/*    <div className="d-flex">*/}
                                                        {/*        <div className="d-flex flex-column ms-3 justify-content-center" style={{fontSize:'14px',textAlign:'left'}}>*/}
                                                        {/*            <div>Dis-P : {row?.discount_percent}</div>*/}
                                                        {/*            <div>Dis-A : {row?.discount_amount}</div>*/}
                                                        {/*        </div>*/}
                                                        {/*    </div>*/}
                                                        {/*</td>*/}
                                                        <td>{stokHandle(row)}</td>
                                                        <td>{hotProductHandle(row)}</td>
                                                        <td>{row?.user?.name}</td>

                                                        <td>
                                                            <DropdownActionButton
                                                                id={row.id}
                                                                isOpen={openDropdownId === row?.id}
                                                                onToggle={() => handleToggle(row?.id)}
                                                                onEditAction={handleEditAction}
                                                                edit={true}
                                                                view={true}
                                                                del={true}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <CustomPagination maindata={products}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {modalInfo.isOpen && (
                    <ProductViewModel action={modalInfo.isOpen} product={product} id={modalInfo.id} onClose={handleCloseModal} />
                )}

            </AuthenticatedLayout>
        </>
    );
}
