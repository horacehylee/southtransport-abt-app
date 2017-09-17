import * as actionTypes from "./actionTypes"

export const changeTab = (prevTab, currTab) => (
    {
        type: actionTypes.CHANGE_TAB,
        payload: {
            prevTab: prevTab,
            currTab: currTab,
        }
    }
)