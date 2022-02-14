import React, { useState, useEffect } from "react";
import { connect } from "react-redux";


const Main = () => {
    return (
        <div class="main">
            <table>
                <tr>
                    <td>Product</td>
                    <td onClick={()=>addCart(item)}>Add Cart</td></tr>
            </table>
        </div>
    )
}