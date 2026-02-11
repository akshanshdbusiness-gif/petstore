"use client"

import { useState, useEffect, JSX } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header
      style={{
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        padding: "20px 40px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src="/logo.png"
            alt="Pawlix Logo"
            width={100}
            height={100}
            priority
          />
          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              fontFamily: "cursive",
              color: "#151414"
            }}
          >
            Pawlix 🐾
          </h1>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: "30px", fontWeight: 500, color: "#151414" }}>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{
              fontSize: "26px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#151414"
            }}
          >
            ☰
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && open && (
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "20px",
            color: "#151414",
          }}
        >
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
        </nav>
      )}
    </header>
  )
}
