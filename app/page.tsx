import { supabase } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")

  if (error) {
    return <div>Error loading products</div>
  }

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>

      {/* ---------- HEADER ---------- */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 60px",
        borderBottom: "1px solid #eee",
        backgroundColor: "#ffffff"
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Image
            src="/logo.png"
            alt="Pawlix Logo"
            width={120}   // 3X bigger (was 40)
            height={120}
            style={{ objectFit: "contain" }}
          />
          <h1 style={{ margin: 0, fontSize: "28px", fontFamily: 'cursive', color: "#111" }}>
            Pawlix.... 🐾
          </h1>
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", gap: "30px", fontFamily: '__nextjs-Geist' }}>
          <Link href="/" style={{ textDecoration: "none", color: "#111", fontWeight: "500" }}>
            Home
          </Link>
          <Link href="/products" style={{ textDecoration: "none", color: "#111", fontWeight: "500" }}>
            Products
          </Link>
          <Link href="/cart" style={{ textDecoration: "none", color: "#111", fontWeight: "500" }}>
            Cart
          </Link>
        </nav>
      </header>

      {/* ---------- MAIN ---------- */}
      <main style={{ fontFamily: "Arial", padding: "40px 60px" }}>
        <h2 style={{ marginBottom: "30px", color: "#111" }}>🐶 My Pet Store</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}>
          {products?.map((p) => (
            <div key={p.id} style={{
              border: "1px solid #eee",
              padding: "16px",
              borderRadius: "10px",
              backgroundColor: "#fff"
            }}>
              <Image
                src={p.image}
                alt={p.name}
                width={220}
                height={160}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              <h3 style={{ margin: 0, fontSize: "28px", fontFamily: 'cursive', color: "#111" }}>{p.name}</h3>
              <p style={{ margin: 0, fontSize: "28px", fontFamily: 'cursive', color: "#111", fontWeight: "bold" }}>₹{p.price}</p>

              {!p.in_stock && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Out of Stock
                </p>
              )}

              <button
                disabled={!p.in_stock}
                style={{
                  width: "100%",
                  padding: "24px",
                  marginTop: "10px",
                  backgroundColor: p.in_stock ? "#ff6b00" : "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: p.in_stock ? "pointer" : "not-allowed",
                  fontWeight: "bold"
                }}
              >
                {p.in_stock ? "Buy Now" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
