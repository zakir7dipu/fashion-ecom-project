import {Button, Modal} from "react-bootstrap";
import {useInternalLink} from "@/Library/Helper";
import React, {useEffect, useState} from "react";
import '../../../../css/StyleCustom.css';

export default function ProductViewModel ({ action, product, id, onClose }) {

    const [singleProduct ,setSingleProduct] = useState();
    const [galleryImage ,setGalleryImage] = useState([]);
    const [productImage ,setProductImage] = useState();

    const changeProductImage = (image_set) =>{
        setProductImage(image_set)
    }

    // console.log(product);

    useEffect(() => {
        if (action){
            const data_edit = product.filter((type) => type.id === id)
            const galleryArray = data_edit[0]?.image_gallerys;
            setGalleryImage(galleryArray)
            setSingleProduct(data_edit[0])
        }
    }, [action]);

    const tagHandle = (row) =>{
        const colorsString = row?.tags;
        if (colorsString){
            const colorsArray = colorsString.split(",");
            return colorsArray.map(item => (
                <span key={item} className="badge bg-info m-1">{item}</span>
            ));
        }
    }

    const stokHandle =(row)=>{
        let instock
        if (row?.in_stock=="1"){
            instock = <span className="badge bg-success mr-2"> Yes</span>
        }else{
            instock = <span className="badge bg-warning mr-2"> No</span>
        }
        let status
        if (row?.status=="1"){
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
    const colorHandle = (row) =>{
        const colorsString = row?.colors;
        if (colorsString){
            const colorsArray = colorsString.split(",");
            return colorsArray.map(item => (
                <span key={item} className="badge bg-primary m-1">{item}</span>
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


    const HtmlContent = (trending) => {
        const content = trending || '';
        return (
            <span dangerouslySetInnerHTML={{ __html: content }} />
        );
    };

    return(
        <>
            <Modal size="xl" show={action}  onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Product View</Modal.Title>
                </Modal.Header>
                <form>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                                <div className="product-image vertical_gallery">

                                    <div id="pr_item_gallery" className="product_gallery_item slick_slider" style={{width:'160px',height:'100px'}}>
                                        <div style={{overflow:"scroll",maxHeight:"590px"}}>
                                        {galleryImage.map((row,i)=>(

                                                <div className="item p-2" key={i}>
                                                    <a href="#" className="product_gallery_item active" onClick={(e)=>changeProductImage(row?.image)}>
                                                        <img src={useInternalLink(row?.image)} alt="product_small_img1"/>
                                                    </a>
                                                </div>

                                        ))}
                                        </div>
                                    </div>

                                    <div className="product_img_box mt-2">
                                        <img id="product_img" src={useInternalLink(productImage?productImage:singleProduct?.product_image?.featured_image)} alt="product_img1" style={{width:'350px'}}/>
                                    </div>
                                </div>


                            </div>

                            <div className="col-lg-6 col-md-6 right-scrollbar"
                                 style={{maxHeight: '900px',overflow: 'auto'}}>
                                <div className="pr_detail">
                                    <div className="product_description" style={{color:"black"}}>
                                        <div className="rating_wrap">
                                            <a className="add_wishlist" href="#"><i className="icon-heart"></i></a>
                                        </div>
                                        <h4 className="product_title"><a href="#">{singleProduct?.name}</a></h4>
                                        <div className="product_prices">
                                            <del>{singleProduct?.regular_price} tk</del>
                                            <span className="price ml-3">{singleProduct?.sale_price} tk</span>
                                        </div>

                                        <div className="pr_switch_wrap">
                                            <div className="product_size_switch_color">
                                                <span className="switch_lable_color">SKU : </span>
                                                <span className="badge bg-success"> {singleProduct?.sku}</span>
                                            </div>
                                        </div>
                                        <div className="pr_switch_wrap">
                                            <div className="product_size_switch_color">
                                                <span className="switch_lable_color">Categories : </span>
                                                <span>{singleProduct?.categorie?.name}</span>
                                            </div>
                                        </div>

                                        <div className="pr_switch_wrap">
                                            <div className="product_size_switch_color">
                                                <span className="switch_lable_color">Sub Categories: </span>
                                                <span> {singleProduct?.sub_categorie?.name}</span>
                                            </div>
                                        </div>

                                        <div className="pr_switch_wrap">
                                            <div className="product_size_switch_color">
                                                <span className="switch_lable_color">Sub Sub Categories: </span>
                                                <span> {singleProduct?.sub_sub_category?.name}</span>
                                            </div>
                                        </div>

                                        <div className="pr_switch_wrap">
                                            <div className="product_size_switch_color">
                                                <span className="switch_lable_color">Tags : </span>
                                                <span> {tagHandle(singleProduct)}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <hr/>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                Description :
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show">
                                                <div className="accordion-body" style={{color:"black"}}>
                                                    {HtmlContent(singleProduct?.description)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="tab-style3">
                                                <ul className="nav nav-tabs" role="tablist">

                                                    <li className="nav-item ">
                                                        <a className="nav-link active" id="Additional-info-tab"
                                                           data-bs-toggle="tab" href="#Additional-info" role="tab"
                                                           aria-controls="Additional-info" aria-selected="false">Additional
                                                            info</a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content shop_info_tab">
                                                    <div className="tab-pane fade show active" id="Additional-info"
                                                         role="tabpanel" aria-labelledby="Additional-info-tab">
                                                        <table className="table table-bordered">
                                                            <tbody>
                                                            <tr>
                                                                <td>Size</td>
                                                                <td>{sizeHandle(singleProduct)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Color</td>
                                                                <td>{colorHandle(singleProduct)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Stock</td>
                                                                <td>{stokHandle(singleProduct)}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
