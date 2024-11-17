import { isElement } from "react-dom/test-utils";
import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import User from "../components/user";

export default function Register() {
    return (
        <div className="">
            <NavBar status={"block"} />
            <User text={"Register"} status={"Register"} role={false} />
        </div>
    )
}