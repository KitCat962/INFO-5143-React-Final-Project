import { useState } from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router"

export default function HeaderFooter() {
    return <>
        <Header />
        <Outlet />
        <Footer />
    </>
}
