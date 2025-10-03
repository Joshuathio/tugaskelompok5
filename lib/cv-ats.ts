"use client"

import { jsPDF } from "jspdf"
import type { CVData } from "@/components/cv-ats-form"

// Converts CVData to plain ATS-friendly text following the provided template
export function cvDataToText(cv: CVData): string {
  const bulletify = (txt?: string) =>
    (txt || "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `• ${l}`)
      .join("\n")

  const lines: string[] = []

  // Header
  const name = cv.fullName?.trim() || "YOUR FULL NAME"
  const nameWithBrackets = name.startsWith("[") && name.endsWith("]") ? name : `[${name}]`
  lines.push(nameWithBrackets.toUpperCase())
  lines.push(`${cv.email} | ${cv.phone} | ${cv.linkedin}`)
  lines.push("")

  // Personal summary
  lines.push(`(xxx) ${cv.summary}`)
  lines.push("")

  // Education
  lines.push("EDUCATION")
  lines.push(
    `${cv.educationUni.degree} in ${cv.educationUni.major}, ${cv.educationUni.university} ${cv.educationUni.period}`,
  )
  if (cv.educationUni.gpa) lines.push(`• Current GPA: ${cv.educationUni.gpa}`)
  if (cv.educationUni.highlight) lines.push(`• ${cv.educationUni.highlight}`)

  const hsTitle = cv.educationHs.school.startsWith("High School Diploma")
    ? cv.educationHs.school
    : `High School Diploma – ${cv.educationHs.school}`
  lines.push(`${hsTitle} ${cv.educationHs.period}`)
  if (cv.educationHs.highlight) lines.push(`• ${cv.educationHs.highlight}`)
  lines.push("")

  // Working Experiences
  lines.push("WORKING EXPERIENCES")
  cv.work.forEach((w, i) => {
    lines.push(`${w.position}, ${w.organization} ${w.period}`)
    const b = bulletify(w.bullets)
    if (b) lines.push(b)
    if (i !== cv.work.length - 1) lines.push("")
  })
  if (cv.work.length === 0) lines.push("")

  // Organizational Experiences
  lines.push("ORGANIZATIONAL EXPERIENCES")
  cv.org.forEach((w, i) => {
    lines.push(`${w.position}, ${w.organization} ${w.period}`)
    const b = bulletify(w.bullets)
    if (b) lines.push(b)
    if (i !== cv.org.length - 1) lines.push("")
  })
  if (cv.org.length === 0) lines.push("")

  // Honors & Awards
  lines.push("HONORS & AWARDS")
  cv.awards.forEach((a) => {
    lines.push(`• ${a.title}, ${a.organizer} ${a.period}`)
    if (a.description) lines.push(`(xxx) ${a.description}`)
  })
  lines.push("")

  // Skills
  lines.push("SKILLS")
  if (cv.skills.language) lines.push(`Language: ${cv.skills.language}`)
  if (cv.skills.software) lines.push(`Software: ${cv.skills.software}`)
  if (cv.skills.others) lines.push(`Others:\n${bulletify(cv.skills.others)}`)

  return lines.join("\n")
}

// Generates and downloads a PDF with monospaced layout for ATS
export async function generateCvPdf(cv: CVData, opts: { mode?: "download" | "preview" } = {}) {
  const { mode = "download" } = opts
  const doc = new jsPDF({ unit: "pt", format: "a4" })

  // Typography and layout
  const FONT = "times"
  const SIZE = 12
  const NAME_SIZE = 16
  const LINE = 16
  const MARGIN_X = 56
  const MARGIN_Y = 56
  const PAGE_WIDTH = doc.internal.pageSize.getWidth()
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2

  doc.setFont(FONT, "normal")
  doc.setFontSize(SIZE)

  let y = MARGIN_Y

  const textWidth = (t: string, size = SIZE, font: "normal" | "bold" = "normal") => {
    doc.setFont(FONT, font)
    doc.setFontSize(size)
    return doc.getTextWidth(t)
  }

  const addLine = (x1 = MARGIN_X, x2 = PAGE_WIDTH - MARGIN_X, thickness = 1) => {
    doc.setLineWidth(thickness)
    doc.line(x1, y + 6, x2, y + 6)
    y += LINE
  }

  const addGap = (mult = 1) => {
    y += LINE * mult
  }

  const ensureSpace = (needed = LINE * 3) => {
    if (y + needed > doc.internal.pageSize.getHeight() - MARGIN_Y) {
      doc.addPage()
      y = MARGIN_Y
    }
  }

  const drawCentered = (text: string, size = SIZE, font: "normal" | "bold" = "normal") => {
    doc.setFont(FONT, font)
    doc.setFontSize(size)
    const w = textWidth(text, size, font)
    doc.text(text, MARGIN_X + (CONTENT_WIDTH - w) / 2, y)
    y += LINE
  }

  const drawLeftRight = (left: string, right: string, leftBold = true) => {
    ensureSpace(LINE * 2)
    // left bold, right normal, right-aligned
    doc.setFont(FONT, leftBold ? "bold" : "normal")
    doc.setFontSize(SIZE)
    const rightW = textWidth(right, SIZE, "normal")
    const rightX = MARGIN_X + CONTENT_WIDTH - rightW

    doc.text(left, MARGIN_X, y)
    doc.setFont(FONT, "normal")
    doc.text(right, rightX, y)
    y += LINE
  }

  const drawSection = (title: string) => {
    ensureSpace(LINE * 3)
    doc.setFont(FONT, "bold")
    doc.setFontSize(SIZE)
    doc.text(title.toUpperCase(), MARGIN_X, y)
    addLine() // horizontal rule under section title
  }

  const drawBullets = (bullets: string) => {
    const lines = bullets
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
    for (const l of lines) {
      ensureSpace(LINE * 1.5)
      doc.setFont(FONT, "normal")
      doc.text("•", MARGIN_X, y)
      // Remove bullet if it already starts with one
      const text = l.startsWith("•") ? l.slice(1).trim() : l
      const wrapped = doc.splitTextToSize(text, CONTENT_WIDTH - 20)
      doc.text(wrapped, MARGIN_X + 14, y)
      y += LINE * Math.max(1, wrapped.length)
    }
  }

  // Header
  const name = cv.fullName?.trim() || "YOUR FULL NAME"
  const nameWithBrackets = name.startsWith("[") && name.endsWith("]") ? name : `[${name}]`
  doc.setFont(FONT, "bold")
  doc.setFontSize(NAME_SIZE)
  drawCentered(nameWithBrackets.toUpperCase(), NAME_SIZE, "bold")

  doc.setFont(FONT, "normal")
  doc.setFontSize(SIZE)
  drawCentered(`${cv.email} | ${cv.phone} | ${cv.linkedin}`)

  addGap(0.5)

  // Summary
  ensureSpace(LINE * 4)
  doc.text(`(xxx) ${cv.summary}`, MARGIN_X, y)
  y += LINE
  // addLine() was creating an unwanted horizontal line

  // Education
  drawSection("Education")
  // University line: bold left, right-aligned period
  const uniLeft = `${cv.educationUni.degree} in ${cv.educationUni.major}, ${cv.educationUni.university}`
  drawLeftRight(uniLeft, cv.educationUni.period, true)
  if (cv.educationUni.gpa) {
    doc.setFont(FONT, "normal")
    doc.text("•", MARGIN_X, y)
    doc.text(`Current GPA: ${cv.educationUni.gpa}`, MARGIN_X + 14, y)
    y += LINE
  }
  if (cv.educationUni.highlight) {
    doc.setFont(FONT, "normal")
    doc.text("•", MARGIN_X, y)
    doc.text(cv.educationUni.highlight, MARGIN_X + 14, y)
    y += LINE
  }

  // High School line: bold left, right-aligned period
  const hsTitle = cv.educationHs.school.startsWith("High School Diploma")
    ? cv.educationHs.school
    : `High School Diploma – ${cv.educationHs.school}`
  drawLeftRight(hsTitle, cv.educationHs.period, true)
  if (cv.educationHs.highlight) {
    doc.setFont(FONT, "normal")
    doc.text("•", MARGIN_X, y)
    doc.text(cv.educationHs.highlight, MARGIN_X + 14, y)
    y += LINE
  }

  addGap(0.25)

  // Working Experiences
  drawSection("Working Experiences")
  for (const w of cv.work) {
    const left = `${w.position}, ${w.organization}`
    drawLeftRight(left, w.period, true)
    if (w.bullets?.trim()) {
      drawBullets(w.bullets)
    }
    addGap(0.25)
  }

  // Organizational Experiences
  drawSection("Organizational Experiences")
  for (const o of cv.org) {
    const left = `${o.position}, ${o.organization}`
    drawLeftRight(left, o.period, true)
    if (o.bullets?.trim()) {
      drawBullets(o.bullets)
    }
    addGap(0.25)
  }

  // Honors & Awards
  drawSection("Honors & Awards")
  for (const a of cv.awards) {
    ensureSpace(LINE * 2)

    const period = a.period || ""
    const rightW = textWidth(period)
    const rightX = MARGIN_X + CONTENT_WIDTH - rightW
    doc.setFont(FONT, "normal")
    doc.text(period, rightX, y)

    // Bullet
    doc.text("•", MARGIN_X, y)

    const title = (a.title || "").trim()
    const organizer = (a.organizer || "").trim()

    const ofIdx = title.toLowerCase().indexOf(" of ")
    const commaIdx = title.indexOf(",")
    const splitIdx = ofIdx >= 0 ? ofIdx : commaIdx

    const statusPart = splitIdx !== -1 ? title.slice(0, splitIdx) : title
    let remainder = splitIdx !== -1 ? title.slice(splitIdx) : ""

    let compName = ""
    if (remainder.toLowerCase().startsWith(" of ")) {
      const afterOf = remainder.slice(4)
      const comma2 = afterOf.indexOf(",")
      compName = comma2 >= 0 ? afterOf.slice(0, comma2) : afterOf
      remainder = comma2 >= 0 ? remainder.slice(4 + comma2) : ""
    }

    const organizerSegments: { text: string; bold?: boolean }[] = []
    const xxMatch = organizer.match(/^XX(\s+|$)/)
    if (xxMatch) {
      organizerSegments.push({ text: "XX", bold: true })
      organizerSegments.push({ text: organizer.slice(2) })
    } else {
      organizerSegments.push({ text: organizer })
    }

    const leftSegments: { text: string; bold?: boolean }[] = []
    if (statusPart) leftSegments.push({ text: statusPart.trim(), bold: true })
    if (compName) {
      leftSegments.push({ text: " of " })
      leftSegments.push({ text: compName.trim(), bold: true })
    }
    if (remainder) leftSegments.push({ text: remainder })

    if (organizer) {
      if (!remainder.trim().endsWith(",")) {
        leftSegments.push({ text: ", " })
      } else {
        leftSegments.push({ text: " " })
      }
      organizerSegments.forEach((segment) => leftSegments.push(segment))
    }

    let x = MARGIN_X + 14
    for (const seg of leftSegments) {
      if (!seg.text) continue
      const font = seg.bold ? "bold" : "normal"
      doc.setFont(FONT, font as any)
      const parts = doc.splitTextToSize(seg.text, CONTENT_WIDTH - (x - MARGIN_X))
      if (Array.isArray(parts)) {
        const first = parts[0] || ""
        doc.text(first, x, y)
        x += textWidth(first, SIZE, seg.bold ? "bold" : "normal")
        for (let i = 1; i < parts.length; i++) {
          y += LINE
          ensureSpace(LINE * 2)
          x = MARGIN_X + 14
          doc.text(parts[i], x, y)
          x += textWidth(parts[i], SIZE, seg.bold ? "bold" : "normal")
        }
      } else {
        doc.text(seg.text, x, y)
        x += textWidth(seg.text, SIZE, seg.bold ? "bold" : "normal")
      }
    }
    y += LINE

    if (a.description?.trim()) {
      const desc = `(xxx) ${a.description}`
      const wrappedDesc = doc.splitTextToSize(desc, CONTENT_WIDTH)
      doc.setFont(FONT, "normal")
      doc.text(wrappedDesc, MARGIN_X, y)
      y += LINE * Math.max(1, Array.isArray(wrappedDesc) ? wrappedDesc.length : 1) + LINE * 0.25
    } else {
      y += LINE * 0.25
    }
  }

  // Skills
  drawSection("Skills")
  if (cv.skills.language) {
    doc.setFont(FONT, "bold")
    doc.text("Language:", MARGIN_X, y)
    const labelWidth = textWidth("Language:", SIZE, "bold")
    doc.setFont(FONT, "normal")
    const wrapped = doc.splitTextToSize(` ${cv.skills.language}`, CONTENT_WIDTH - labelWidth)
    doc.text(wrapped, MARGIN_X + labelWidth, y)
    y += LINE * Math.max(1, Array.isArray(wrapped) ? wrapped.length : 1)
  }
  if (cv.skills.software) {
    doc.setFont(FONT, "bold")
    doc.text("Software:", MARGIN_X, y)
    const labelWidth = textWidth("Software:", SIZE, "bold")
    doc.setFont(FONT, "normal")
    const wrapped = doc.splitTextToSize(` ${cv.skills.software}`, CONTENT_WIDTH - labelWidth)
    doc.text(wrapped, MARGIN_X + labelWidth, y)
    y += LINE * Math.max(1, Array.isArray(wrapped) ? wrapped.length : 1)
  }
  if (cv.skills.others?.trim()) {
    doc.setFont(FONT, "bold")
    doc.text("Others:", MARGIN_X, y)
    y += LINE
    doc.setFont(FONT, "normal")
    drawBullets(cv.skills.others)
  }

  const safeName = (cv.fullName || "YOUR_FULL_NAME").replace(/[^a-z0-9\- ]/gi, "").replace(/\s+/g, "_")
  if (mode === "preview") {
    const url = doc.output("bloburl")
    try {
      window.open(url, "_blank", "noopener,noreferrer")
    } catch {
      // fallback render
      doc.output("dataurlnewwindow")
    }
    return
  }
  doc.save(`CV_${safeName}_ATS.pdf`)
}

const drawLabelValue = (label: string, value: string) => {
  // Implementation of drawLabelValue
}

const drawRichSegments = (segments: { text: string; bold?: boolean }[], xStart = 56 + 14, maxWidth = 592 - 20) => {
  // Implementation of drawRichSegments
}
