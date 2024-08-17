import React, {useCallback, useEffect, useState} from 'react';
import {Head, Link, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import PageLink from "@/Components/Srceen/pagelink";
import {
    errorMessage,
    inertiaErrorMessage,
    infoMessage,
    labelNameRSt,
    successMessage,
    ucwords,
    useInternalLink
} from "@/Library/Helper";
import {TagsInput} from "react-tag-input-component";
import Button from "react-bootstrap/Button";
import {InputForm} from "@/Components/FormShare/InputForm";
import InputError from "@/Components/InputError";
import {useDropzone} from "react-dropzone";
import '../../../../css/ImageUpload.css';
import axios from "axios";
import {Editor} from "primereact/editor";


export default function UpdateProducts ({categories,product,shippings}) {
    const [isLoading,setIsLoading] = useState(false);
    const [editIdData,setEditIdData] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [tags, setTags] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [subCategoryStatus, setSubCategoryStatus] = useState(true);
    const [subSubCategoryStatus, setSubSubCategoryStatus] = useState(true);
    const [requireStatus, setRequireStatus] = useState(true);
    const [requireStatusSub, setRequireStatusSub] = useState(true);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [selectedFeaturedImage, setSelectedFeaturedImage] = useState(null);
    const [selectedImageUrlFeature, setSelectedImageUrlFeature] = useState("");

    const [selectedProductImage, setSelectedProductImage] = useState(null);
    const [selectedImageUrlProductImage, setSelectedImageUrlProductImage] = useState("");


    const [selectedProductImageBig, setSelectedProductImageBig] = useState(null);
    const [selectedImageUrlProductImageBig, setSelectedImageUrlProductImageBig] = useState("");


    const [selectedProductImageSmall, setSelectedProductImageSmall] = useState(null);
    const [selectedImageUrlProductImageSmall, setSelectedImageUrlProductImageSmall] = useState("");


    const [selectedSizeChartImage, setSelectedSizeChartImage] = useState(null);
    const [selectedSizeChartImageUrl, setSelectedSizeChartImageUrl] = useState("");
    const [selectedMeasurementImage, setSelectedMeasurementImage] = useState(null);
    const [selectedMeasurementImageUrl, setSelectedMeasurementImageUrl] = useState("");
    const [images, setImages] = useState([]);

    const { data, setData, errors,progress, processing, post, reset} = useForm({
        'categorie_id':"", 'sub_category_id':"", 'sub_sub_category_id':"", 'supplier_id':"", 'name':"", 'sku':"", 'regular_price':"", 'sale_price':"", 'description':"",'offer_for_you':"",'return_exchange_policy':"", 'colors':"", 'size':"", 'featured_image':null, 'gallery':[], 'tags':"", 'in_stock':"",'hot_product':"", 'status':"",'material':"",'shipping_id':"","affiliate_percent":"","is_affiliate":"", 'size_chart_image':"", 'measure_image':"","affiliate_percent_user":"",'product_image':'','product_image_big':'','product_image_small':'',
    });

    useEffect(() => {
        setEditIdData(product?.id)
        setIsEdit(true)
        setData(data => ({ ...data, product_id: product?.id}));
        setData(data => ({ ...data, categorie_id: product.categorie_id}));
        setData(data => ({ ...data, supplier_id: product.supplier_id?product.supplier_id:""}));
        setData(data => ({ ...data, name: product.name}));
        setData(data => ({ ...data, sku: product.sku}));
        setData(data => ({ ...data, material: product.material}));
        setData(data => ({ ...data, regular_price: product.regular_price}));
        setData(data => ({ ...data, sale_price: product.sale_price}));
        setData(data => ({ ...data, description: product.description}));
        setData(data => ({ ...data, offer_for_you: product.offer_for_you}));
        setData(data => ({ ...data, return_exchange_policy: product.return_exchange_policy}));
        setData(data => ({ ...data, status: product.status}));
        setData(data => ({ ...data, shipping_id: product.shipping_id}));
        setData(data => ({ ...data, affiliate_percent: product.affiliate_percent}));
        setData(data => ({ ...data, affiliate_percent_user: product.affiliate_percent_user}));

        setSelectedSizeChartImage(product?.product_image?.size_chart_image);
        setSelectedSizeChartImageUrl(useInternalLink(product?.product_image?.size_chart_image));

        setSelectedMeasurementImage(product?.product_image?.measure_image);
        setSelectedMeasurementImageUrl(useInternalLink(product?.product_image?.measure_image));


        setSelectedFeaturedImage(product?.product_image?.featured_image);
        setSelectedImageUrlFeature(useInternalLink(product?.product_image?.featured_image));


        setSelectedProductImage(product?.product_image?.product_image);
        setSelectedImageUrlProductImage(useInternalLink(product?.product_image?.product_image));

        setSelectedProductImageBig(product?.product_image?.product_image_big);
        setSelectedImageUrlProductImageBig(useInternalLink(product?.product_image?.product_image_big));

        setSelectedProductImageSmall(product?.product_image?.product_image_small);
        setSelectedImageUrlProductImageSmall(useInternalLink(product?.product_image?.product_image_small));

        const galleryArr = product?.image_gallerys;
        const options = [];
        if (galleryArr){
            galleryArr.map((item , i)=> (
                options.push({ preview: useInternalLink(item?.image),id: item?.id})
            ));
            setImages(options)
        }

        const colorsString = product.colors?product?.colors:"";
        if (colorsString){
            const colorsArray = colorsString.split(",");
            setColor(colorsArray)
        }

        const sizeString = product?.size;
        if (sizeString){
            const sizeArray = sizeString.split(",");
            setSize(sizeArray)
        }

        const tagsString = product?.tags;
        if (tagsString){
            const tagsArray = tagsString.split(",");
            setTags(tagsArray)
        }

        if (product?.in_stock==1){
            setData(data => ({ ...data, in_stock: true}));
        }else{
            setData(data => ({ ...data, in_stock: false}));
        }
        if (product?.hot_product==1){
            setData(data => ({ ...data, hot_product: true}));
        }else{
            setData(data => ({ ...data, hot_product: false}));
        }
        if (product?.is_affiliate==1){
            setData(data => ({ ...data, is_affiliate: true}));
        }else{
            setData(data => ({ ...data, is_affiliate: false}));
        }

        const selectedCategory = categories.filter((type) =>type.id == product.categorie_id)
        const isEmpty = Object.keys(selectedCategory).length === 0;
        if (isEmpty==false) {
            const isEmpty = Object.keys(selectedCategory[0].sub_categories).length == 0;
            if (isEmpty==false) {
                setSubCategories(selectedCategory[0].sub_categories || []);

                setData(data => ({ ...data, sub_category_id: product.sub_category_id}));
                setSubCategoryStatus(false);
                setRequireStatus(true)

                const isEmpty = Object.keys(selectedCategory[0].sub_categories[0].sub_sub_categorys.length === 0);
                if (isEmpty===false) {
                    setSubSubCategories(selectedCategory[0].sub_categories[0].sub_sub_categorys || []);
                    setData(data => ({ ...data, sub_sub_category_id: product.sub_sub_category_id}));
                    setSubSubCategoryStatus(false);
                    setRequireStatusSub(true)
                }else{
                    setSubSubCategories([]);
                    setRequireStatusSub(false)
                    setSubSubCategoryStatus(true);
                }
            }else{
                setSubCategories([]);
                setSubCategoryStatus(true);
                setRequireStatus(false)
            }
        } else {
            setSubCategories([]);
            setSubCategoryStatus(true);
            setRequireStatus(false)
        }

    }, [product])

    const submit = (e) => {
        e.preventDefault();
        let message,url
        if (!isEdit){
            message ="Product Update Success";
            url = route('product_list.store');
        }else{
            message ="Product Update Success";
            url = route('product_list.update',editIdData);
        }
        post((url), {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setIsLoading(false);
                successMessage(message);
                reset()
                ImageReset()
            },
            onError: (err) => {
                inertiaErrorMessage(err)
                setIsLoading(false);
            }
        });
    };

    const ImageReset = ()=>{
        setSelectedFeaturedImage(null)
        setSelectedImageUrlFeature(null)
        setSelectedSizeChartImage(null)
        setSelectedSizeChartImageUrl(null)
        setSelectedMeasurementImage(null)
        setSelectedMeasurementImageUrl(null)
        setImages(null)
    }

    const handleCategory = (e) => {
        setSubSubCategoryStatus(true);
        const categoryId = e.target.value;
        setData(data => ({ ...data, categorie_id: categoryId}));
        const selectedCategory = categories.filter((type) =>type.id == categoryId)
        const isEmpty = Object.keys(selectedCategory).length === 0;
        if (isEmpty==false) {
            const isEmpty = Object.keys(selectedCategory[0].sub_categories).length === 0;
            if (isEmpty==false) {
                setSubCategories(selectedCategory[0].sub_categories || []);
                setSubSubCategories([]);
                setData(data => ({ ...data, sub_category_id: ""}));
                setData(data => ({ ...data, sub_sub_category_id: ""}));
                setSubCategoryStatus(false);
                setRequireStatus(true)
            }else{
                setSubCategories([]);
                setSubSubCategories([]);
                setData(data => ({ ...data, sub_category_id: ""}));
                setData(data => ({ ...data, sub_sub_category_id: ""}));
                setSubCategoryStatus(true);
                setRequireStatus(false)
            }
        } else {
            setSubCategories([]);
            setSubSubCategories([]);
            setData(data => ({ ...data, sub_category_id: ""}));
            setData(data => ({ ...data, sub_sub_category_id: ""}));
            setSubCategoryStatus(true);
            setRequireStatus(false)
        }
    }

    const handleSubCategory = (e) => {
        const subCategoryId = e.target.value;
        setData(data => ({ ...data, sub_category_id: subCategoryId}));
        const selectedSubCategory = subCategories.filter((type) =>type.id == subCategoryId);
        const isEmpty = Object.keys(selectedSubCategory).length === 0;
        if (isEmpty==false) {
            const isEmpty = Object.keys(selectedSubCategory[0].sub_sub_categorys).length === 0;
            if (isEmpty==false) {
                setSubSubCategories(selectedSubCategory[0].sub_sub_categorys || []);
                setSubSubCategoryStatus(false);
                setRequireStatusSub(true)
            }else{
                setSubSubCategories([]);
                setSubSubCategoryStatus(true);
                setRequireStatusSub(false)
            }
        } else {
            setRequireStatusSub(false)
            setSubSubCategories([]);
            setSubSubCategoryStatus(true);
        }
    }

    useEffect(() => {
        setData(data => ({ ...data, colors: color}));
    }, [color])

    useEffect(() => {
        setData(data => ({ ...data, tags: tags}));
    }, [tags])

    useEffect(() => {
        setData(data => ({ ...data, size: size}));
    }, [size])

    const handleInStock = (e) => {
        setData('in_stock', e.target.checked);
    }

    const handleInHotProduct = (e) => {
        setData('hot_product', e.target.checked);
    }

    const onDrop = useCallback((acceptedFiles) => {
        setImages([...images, ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))]);
    }, [setData,images]);

    const removeImage = (e,file) => {
        e.preventDefault();
        // console.log(file)
        if (!file?.path) {
            const imageData = {
                product_id: editIdData,
                image_id: file.id,
            };
            post(route('product_list.remove_image', imageData), {
                onError: () => {
                    errorMessage("Sub Categories Delete Not Success!");
                }
            });
        }
        setImages(images.filter(image => image !== file));
    };

    useEffect(() => {
        setData(data => ({ ...data, gallery: images}));
    }, [images])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true
    });


    const imageHandleFeatured = (e) =>{
        setSelectedFeaturedImage(e.target.files[0]);
        setData('featured_image',e.target.files[0]);
        setSelectedImageUrlFeature(URL.createObjectURL(e.target.files[0]))
    }

    const imageHandleProductImage = (e) =>{
        setSelectedProductImage(e.target.files[0]);
        setData('product_image',e.target.files[0]);
        setSelectedImageUrlProductImage(URL.createObjectURL(e.target.files[0]))
    }

    const imageHandleProductImageBig = (e) =>{
        setSelectedProductImageBig(e.target.files[0]);
        setData('product_image_big',e.target.files[0]);
        setSelectedImageUrlProductImageBig(URL.createObjectURL(e.target.files[0]))
    }

    const imageHandleProductImageSmall = (e) =>{
        setSelectedProductImageSmall(e.target.files[0]);
        setData('product_image_small',e.target.files[0]);
        setSelectedImageUrlProductImageSmall(URL.createObjectURL(e.target.files[0]))
    }


    const imageHandleSizeChart = (e) =>{
        setSelectedSizeChartImage(e.target.files[0]);
        setData('size_chart_image',e.target.files[0]);
        setSelectedSizeChartImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const imageHandleMeasurementImage = (e) =>{
        setSelectedMeasurementImage(e.target.files[0]);
        setData('measure_image',e.target.files[0]);
        setSelectedMeasurementImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleIsAffiliate = (e) => {
        setData('is_affiliate', e.target.checked);
    }

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Update Product" />

                <CircleSpinnerOverlay
                    loading={isLoading}
                    overlayColor="rgba(0,153,255,0.2)"
                    size={30}
                />
                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <PageLink props={"Update Product"}/>
                                <div className="iq-card">
                                    <div className="iq-card-header text-right">
                                        <Link className="btn btn-primary btn-sm mr-2 mb-2" href={route('product_list.index')}>&nbsp; Products List
                                        </Link>
                                    </div>
                                    <div className="iq-card-body">
                                        <form onSubmit={(e)=>submit(e)} encType="multipart/form-data" >

                                            <div className="row">

                                                <InputForm col_name="col-md-4 mb-3" className="text-danger ml-1" type="text" label="name" name="name" value={data?.name} onChange={(e) => setData('name', e.target.value)} error={errors?.name} required={true}/>
                                                <InputForm col_name="col-md-4 mb-3" className=" ml-1" type="text" label="sku" name="sku" value={data?.sku} onChange={(e) => setData('sku', e.target.value)} error={errors?.sku}/>

                                                <InputForm col_name="col-md-4 mb-3" className=" ml-1" type="text" label="product material" name="material" value={data?.material} onChange={(e) => setData('material', e.target.value)} error={errors?.material}/>

                                                <div className="col-md-3 mb-3">
                                                    <label> {labelNameRSt("categories")} <strong className="text-danger ml-1"> *</strong></label>
                                                    <select id="categorie_id" name="categorie_id" className="form-control" value={data?.categorie_id} onChange={(e) => handleCategory(e)} required={true}>
                                                        <option value="" disabled={data?.categorie_id ? null : true} >Select One</option>
                                                        {categories.map((row,i)=>(
                                                            <option key={i} value={row?.id}>{ucwords(row?.name)}</option>
                                                        ))}
                                                    </select>
                                                    {errors && <InputError message={errors?.categorie_id} />}
                                                </div>

                                                {subCategories.length?
                                                    <>
                                                        <div className="col-md-3 mb-3">
                                                            <label> {labelNameRSt("sub_category")} <strong className="text-danger ml-1"> {requireStatus?'*':""}</strong></label>
                                                            <select id="sub_category_id" name="sub_category_id" disabled={subCategoryStatus} className="form-control" value={data.sub_category_id?data.sub_category_id:""} onChange={(e) => handleSubCategory(e)} required={requireStatus}>
                                                                <option value="" disabled={data?.sub_category_id ? null : true} >Select One</option>
                                                                {subCategories.map((row,i)=>(
                                                                    <option key={i} value={row?.id}>{ucwords(row?.name)}</option>
                                                                ))}
                                                            </select>
                                                            {errors && <InputError message={errors?.sub_category_id} />}
                                                        </div>
                                                    </>
                                                    :""}

                                                {subSubCategories.length?
                                                    <>
                                                        <div className="col-md-3 mb-3">
                                                            <label> {labelNameRSt("sub_sub_category_id")} <strong className="text-danger ml-1"> {requireStatusSub?'*':""}</strong></label>
                                                            <select id="sub_sub_category_id" name="sub_sub_category_id" disabled={subSubCategoryStatus} className="form-control" value={data.sub_sub_category_id?data.sub_sub_category_id:""} onChange={e => setData('sub_sub_category_id', e.target.value)} required={requireStatusSub}>
                                                                <option value="" disabled={data?.sub_sub_category_id ? null : true} >Select One</option>
                                                                {subSubCategories.map((row,i)=>(
                                                                    <option key={i} value={row?.id}>{ucwords(row?.name)}</option>
                                                                ))}
                                                            </select>
                                                            {errors && <InputError message={errors?.sub_sub_category_id} />}
                                                        </div>
                                                    </>
                                                    :""}


                                                <div className="col-md-3 mb-3">
                                                    <label> {labelNameRSt("product status")} <strong className="text-danger ml-1"> *</strong></label>
                                                    <select name="status" className="form-control" onChange={(e) => setData('status', e.target.value)} value={data?.status} style={{fontSize:'13px',color:'black'}} required={true}>
                                                        <option value="" disabled={data?.status ? null : true} >Select One</option>
                                                        <option value="1">{ucwords('active')}</option>
                                                        <option value="2">{ucwords('inactive')}</option>
                                                    </select>
                                                    {errors && <InputError message={errors?.status} />}
                                                </div>

                                                <div className="col-md-3 mb-3 mt-4">
                                                    <div className="mb-2 row">
                                                        <div className="col-md-6">
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" id="in_stock" name="in_stock" value={data.in_stock} onChange={handleInStock} checked={data.in_stock} />
                                                                <label className="form-check-label" htmlFor="in_stock">In Stock</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" id="hot_product" name="hot_product" value={data.hot_product} onChange={handleInHotProduct} checked={data.hot_product} />
                                                                <label className="form-check-label" htmlFor="hot_product">{labelNameRSt("hot_product")}</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" id="is_affiliate" name="is_affiliate" value={data.is_affiliate} onChange={handleIsAffiliate} checked={data.is_affiliate} />
                                                                <label className="form-check-label" htmlFor="is_affiliate">{labelNameRSt("is affiliate")}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-md-3 mb-3">
                                                    <label> {labelNameRSt("shipping")} <strong className="text-danger ml-1"> *</strong></label>
                                                    <select id="shipping_id" name="shipping_id" className="form-control" value={data?.shipping_id} onChange={(e) => setData('shipping_id', e.target.value)} required={true}>
                                                        <option value="" disabled={data?.shipping_id ? null : true} >Select One</option>
                                                        {shippings.map((row,i)=>(
                                                            <option key={i} value={row?.id}>{ucwords(row?.name)}</option>
                                                        ))}
                                                    </select>
                                                    {errors && <InputError message={errors?.shipping_id} />}
                                                </div>

                                                <InputForm col_name="col-md-3 mb-3" className="text-danger ml-1" type="number" label="regular_price" name="regular_price" value={data?.regular_price} onChange={(e) => setData('regular_price', e.target.value)} error={errors?.regular_price} required={true}/>

                                                <InputForm col_name="col-md-3 mb-3" className="text-danger ml-1" type="number" label="sale_price" name="sale_price" value={data?.sale_price} onChange={(e) => setData('sale_price', e.target.value)} error={errors?.sale_price} required={true}/>

                                                {data.is_affiliate===true?
                                                    <InputForm col_name="col-md-3 mb-3" className="text-danger ml-1" type="number" label="affiliate_percent for customer" name="affiliate_percent" value={data?.affiliate_percent} onChange={(e) => setData('affiliate_percent', e.target.value)} error={errors?.affiliate_percent} required={true}/>
                                                    :""}

                                                {data.is_affiliate===true?
                                                    <InputForm col_name="col-md-3 mb-3" className="text-danger ml-1" type="number" label="affiliate percent for user" name="affiliate_percent_user" value={data?.affiliate_percent_user} onChange={(e) => setData('affiliate_percent_user', e.target.value)} error={errors?.affiliate_percent_user} required={true}/>
                                                    :""}

                                                <div className="col-md-4 mb-3">
                                                    <label htmlFor="colors" className="form-label">Colors</label>
                                                    <TagsInput
                                                        value={color}
                                                        onChange={setColor}
                                                        name="color"
                                                        placeHolder="Enter Color tags here"
                                                        separators={[',', 'Enter']}
                                                    />
                                                    <em>Press coma or enter to add new tag</em>
                                                </div>

                                                <div className="col-md-4 mb-3">
                                                    <label htmlFor="size" className="form-label">Size</label>
                                                    <TagsInput
                                                        value={size}
                                                        onChange={setSize}
                                                        name="size"
                                                        placeHolder="Enter Size tags here"
                                                        separators={[',', 'Enter']}
                                                    />
                                                    <em>Press coma or enter to add new tag</em>
                                                </div>

                                                <div className="col-md-4 mb-3">
                                                    <label htmlFor="tags" className="form-label">Tags</label>
                                                    <TagsInput
                                                        value={tags}
                                                        onChange={setTags}
                                                        name="tags"
                                                        placeHolder="Enter tags here"
                                                        separators={[',', 'Enter']}
                                                    />
                                                    <em>Press coma or enter to add new tag</em>
                                                </div>
                                            </div>

                                            <hr/>

                                            <div className="row">

                                                <div className="col-md-8 mb-3">
                                                    <label>{labelNameRSt("description")}<strong className="text-danger ml-1"> *</strong></label>

                                                    <Editor value={data?.description} onTextChange={(e) => setData('description',e.htmlValue)} style={{ height: '200px' }} required={true}/>

                                                    <InputError message={errors.description} className="mt-2" />
                                                </div>


                                                <div className="col-md-4 mb-2">
                                                    <div className="col-md-12 mb-4">
                                                        <label> {labelNameRSt("offer_for_you")} <strong className="text-danger ml-1"> </strong></label>

                                                        <textarea className="form-control" aria-label="With textarea" style={{height: 100}} placeholder={labelNameRSt("offer_for_you")} id="offer_for_you" onChange={(e) => setData('offer_for_you', e.target.value)} value={data.offer_for_you} > </textarea>

                                                        {errors && <InputError message={errors?.offer_for_you} />}
                                                    </div>

                                                    <div className="col-md-12 mb-3">
                                                        <label> {labelNameRSt("return_exchange_policy")} <strong className="text-danger ml-1"> </strong></label>

                                                        <textarea className="form-control" aria-label="With textarea" style={{height: 100}} placeholder={labelNameRSt("return_exchange_policy")} id="return_exchange_policy" onChange={(e) => setData('return_exchange_policy', e.target.value)} value={data.return_exchange_policy} > </textarea>
                                                        {errors && <InputError message={errors?.return_exchange_policy} />}
                                                    </div>
                                                </div>
                                            </div>

                                            <hr/>

                                            <div className="row">

                                                <div className="col-md-4 mb-3">
                                                    <label> {labelNameRSt("featured_image: 540X600")} <strong className="text-danger ml-1"> *</strong></label>
                                                    <input type="file" className="form-control" name="featured_image" onChange={imageHandleFeatured}/>
                                                    {errors && <InputError message={errors.featured_image} />}
                                                    {selectedFeaturedImage != null ?
                                                        <img
                                                            alt="not"
                                                            style={{ width: '60px',marginTop:'5px'}}
                                                            src={selectedImageUrlFeature}
                                                        />
                                                        : ""}
                                                </div>

                                                <div className="col-md-4 mb-3">
                                                    <label> {labelNameRSt("product_image: 510X765")} <strong className="text-danger ml-1"> *</strong></label>
                                                    <input type="file" className="form-control" name="product_image" onChange={imageHandleProductImage}/>
                                                    {errors && <InputError message={errors.product_image} />}
                                                    {selectedProductImage != null ?
                                                        <img
                                                            alt="not"
                                                            style={{ width: '60px',marginTop:'5px'}}
                                                            src={selectedImageUrlProductImage}
                                                        />
                                                        : ""}
                                                </div>

                                                <div className="col-md-4 mb-3">
                                                    <label> {labelNameRSt("product_image mid: 260X390")} <strong className="text-danger ml-1"> *</strong></label>
                                                    <input type="file" className="form-control" name="product_image_big" onChange={imageHandleProductImageBig}/>
                                                    {errors && <InputError message={errors.product_image_big} />}
                                                    {selectedProductImageBig != null ?
                                                        <img
                                                            alt="not"
                                                            style={{ width: '60px',marginTop:'5px'}}
                                                            src={selectedImageUrlProductImageBig}
                                                        />
                                                        : ""}
                                                </div>

                                                <div className="col-md-4 mb-3">
                                                    <label> {labelNameRSt("product_image small: 80X120")} <strong className="text-danger ml-1"> *</strong></label>
                                                    <input type="file" className="form-control" name="product_image_small" onChange={imageHandleProductImageSmall}/>
                                                    {errors && <InputError message={errors.product_image_small} />}
                                                    {selectedProductImageSmall != null ?
                                                        <img
                                                            alt="not"
                                                            style={{ width: '60px',marginTop:'5px'}}
                                                            src={selectedImageUrlProductImageSmall}
                                                        />
                                                        : ""}
                                                </div>

                                                <div className="col-md-4 mb-3">
                                                    <label> {labelNameRSt("size_chart_image: 580X240")} <strong className="text-danger ml-1"> </strong></label>
                                                    <input type="file" className="form-control" name="size_chart_image" onChange={imageHandleSizeChart}/>
                                                    {errors && <InputError message={errors.size_chart_image} />}
                                                    {selectedSizeChartImage != null ?
                                                        <img
                                                            alt="not"
                                                            style={{ width: '60px', marginTop:'5px' }}
                                                            src={selectedSizeChartImageUrl}
                                                        />
                                                        : ""}
                                                </div>

                                                <div className="col-md-4 mb-3">
                                                    <label> {labelNameRSt("measurement image: 610X331")} <strong className="text-danger ml-1"> </strong></label>
                                                    <input type="file" className="form-control" name="measure_image" onChange={imageHandleMeasurementImage}/>
                                                    {errors && <InputError message={errors.measure_image} />}
                                                    {selectedMeasurementImage != null ?
                                                        <img
                                                            alt="not"
                                                            style={{ width: '60px', marginTop:'5px' }}
                                                            src={selectedMeasurementImageUrl}
                                                        />
                                                        : ""}
                                                </div>


                                                <div className="col-md-6 mb-3">
                                                    <label> {labelNameRSt("image gallery :510X765")} <strong className="text-danger ml-1"></strong></label>
                                                    <div className="image-upload-container">
                                                        <div
                                                            {...getRootProps({
                                                                className: `dropzone ${isDragActive ? 'active' : ''} ${isDragAccept ? 'accept' : ''} ${isDragReject ? 'reject' : ''}`
                                                            })}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <p>Drag 'n' drop files here or click to files</p>
                                                            <i className="fa fa-upload" style={{fontSize:'24px'}}></i>
                                                        </div>
                                                        <div className="image-preview">
                                                            {images.map((file, index) => (
                                                                <div key={index} className="image-thumb">
                                                                    <div className="image-thumb-inner">
                                                                        <img src={file.preview} alt={file.image} />
                                                                        <i className="fa fa-minus-circle" style={{fontSize:'24px',color:'red',zIndex:'999999',position:"absolute"}} onClick={(e) => removeImage(e,file)}></i>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="offcanvas-footer border-top">
                                                <div className="d-flex justify-content-center p-3">
                                                    <Button variant="primary" type="submit" disabled={processing}>
                                                        <i className="fa fa-floppy-o"></i> Update
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
