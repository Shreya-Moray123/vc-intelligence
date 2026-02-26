import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid URL" },
        { status: 400 }
      );
    }

    // Fetch website
    const siteRes = await fetch(url);

    if (!siteRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch website", status: siteRes.status },
        { status: 500 }
      );
    }

    const html = await siteRes.text();

    // 🔥 IMPORTANT: Limit size
    const cleanedText = html
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 8000);

    // Mock summary response
    return NextResponse.json({
      summary:
        "This company provides innovative AI solutions for businesses worldwide. They focus on automation, data intelligence, and scalable software infrastructure.",
    });
  } catch (err: any) {
    console.error("ENRICH ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}