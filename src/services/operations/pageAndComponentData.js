import React from 'react'
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';
import toast from 'react-hot-toast';

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
            {categoryId: categoryId}
        )
        if(!response?.data?.success)
            throw new Error("Could nor Fetch Category page data")

        result = response?.data;
    } catch (error) {
        console.log("CATALOG PAGR DATA API ERROR....", error);
        toast.error(error.response.data.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}