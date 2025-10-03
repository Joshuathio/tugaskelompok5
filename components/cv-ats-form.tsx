"use client"

import { useId } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export type CvAward = {
  title: string
  organizer: string
  period: string
  description: string
}

export type CvExperience = {
  organization: string
  position: string
  period: string
  bullets: string // newline separated
}

export type CvEducation = {
  degree: string
  major: string
  university: string
  period: string
  gpa?: string
  highlight?: string
}

export type CvSkills = {
  language: string // free text with level/certs
  software: string // free text with level/certs
  others: string // newline separated bullet list
}

export type CVData = {
  fullName: string
  email: string
  phone: string
  linkedin: string
  summary: string
  educationUni: CvEducation
  educationHs: {
    school: string
    period: string
    highlight?: string
  }
  work: CvExperience[]
  org: CvExperience[]
  awards: CvAward[]
  skills: CvSkills
}

export const defaultCvData: CVData = {
  fullName: "[YOUR FULL NAME]",
  email: "youremail@gmail.com",
  phone: "+62 your phone number",
  linkedin: "https://www.linkedin.com/in/your-profile",
  summary:
    "(xxx) Tulis ringkasan personal 3–5 kalimat yang merangkum kekuatan, pengalaman, dan minat karir Anda. Fokus pada angka dan hasil bila ada.",
  educationUni: {
    degree: "B.(xxx)",
    major: "(xxx) your major",
    university: "(xxx) your university",
    period: "20xx – Present/20xx",
    gpa: "x.xx/4.00 (xx credits)",
    highlight: "",
  },
  educationHs: {
    school: "High School Diploma – (xxx)",
    period: "20xx – 20xx",
    highlight: "Overall grade/distinction/highlight",
  },
  work: [
    {
      organization: "XX <the company/institutions>",
      position: "(xxx) Intern, your position",
      period: "(month/year) – (month/year)",
      bullets:
        "(xxx) accomplishment 1, put number if possible\n(xxx) accomplishment 2, put number if possible\n(xxx) accomplishment 3, put number if possible",
    },
  ],
  org: [
    {
      organization: "XX <organization>",
      position: "(xxx), your position",
      period: "(month/year) – (month/year)",
      bullets: "(xxx) accomplishment 1\n(xxx) accomplishment 2\n(xxx) accomplishment 3",
    },
  ],
  awards: [
    {
      title: "1st Winner <name of awards> of X Competition <event>",
      organizer: "XX <name of organizer>",
      period: "(month/year)",
      description: "(xxx) short description, include number of participants and your distinction (top x%)",
    },
    {
      title: "Awardee <scholarship/award>",
      organizer: "XX <name of awards>",
      period: "(month/year)",
      description: "(xxx) short description, include number of applicants and your distinction (top x%)",
    },
  ],
  skills: {
    language: "(xxx) the language, put proficiency level + certification if available",
    software: "(xxx) the software, put proficiency level + certification if available",
    others: "(xxx) skill name by (xxx) license/cert issuer\n(xxx) skill name by (xxx) license/cert issuer",
  },
}

type Props = {
  value: CVData
  onChange: (v: CVData) => void
}

export function CVATSForm({ value, onChange }: Props) {
  const sectionId = useId()

  const update = <K extends keyof CVData>(key: K, v: CVData[K]) => onChange({ ...value, [key]: v })

  const updateWork = (idx: number, patch: Partial<CvExperience>) => {
    const next = value.work.map((w, i) => (i === idx ? { ...w, ...patch } : w))
    update("work", next)
  }
  const addWork = () => update("work", [...value.work, { organization: "", position: "", period: "", bullets: "" }])
  const removeWork = (idx: number) =>
    update(
      "work",
      value.work.filter((_, i) => i !== idx),
    )

  const updateOrg = (idx: number, patch: Partial<CvExperience>) => {
    const next = value.org.map((w, i) => (i === idx ? { ...w, ...patch } : w))
    update("org", next)
  }
  const addOrg = () => update("org", [...value.org, { organization: "", position: "", period: "", bullets: "" }])
  const removeOrg = (idx: number) =>
    update(
      "org",
      value.org.filter((_, i) => i !== idx),
    )

  const updateAward = (idx: number, patch: Partial<CvAward>) => {
    const next = value.awards.map((a, i) => (i === idx ? { ...a, ...patch } : a))
    update("awards", next)
  }
  const addAward = () => update("awards", [...value.awards, { title: "", organizer: "", period: "", description: "" }])
  const removeAward = (idx: number) =>
    update(
      "awards",
      value.awards.filter((_, i) => i !== idx),
    )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${sectionId}-name`}>Nama Lengkap</Label>
          <Input
            id={`${sectionId}-name`}
            value={value.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`${sectionId}-linkedin`}>LinkedIn</Label>
          <Input
            id={`${sectionId}-linkedin`}
            value={value.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`${sectionId}-email`}>Email</Label>
          <Input
            id={`${sectionId}-email`}
            value={value.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`${sectionId}-phone`}>No. Telepon</Label>
          <Input
            id={`${sectionId}-phone`}
            value={value.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      {/* Summary */}
      <div>
        <Label>Ringkasan (3–5 kalimat)</Label>
        <Textarea value={value.summary} onChange={(e) => update("summary", e.target.value)} className="mt-1" rows={4} />
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pendidikan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Gelar</Label>
            <Input
              value={value.educationUni.degree}
              onChange={(e) => update("educationUni", { ...value.educationUni, degree: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Jurusan</Label>
            <Input
              value={value.educationUni.major}
              onChange={(e) => update("educationUni", { ...value.educationUni, major: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Universitas</Label>
            <Input
              value={value.educationUni.university}
              onChange={(e) => update("educationUni", { ...value.educationUni, university: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Periode</Label>
            <Input
              value={value.educationUni.period}
              onChange={(e) => update("educationUni", { ...value.educationUni, period: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>GPA & SKS (opsional)</Label>
            <Input
              value={value.educationUni.gpa || ""}
              onChange={(e) => update("educationUni", { ...value.educationUni, gpa: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Highlight (opsional)</Label>
            <Input
              value={value.educationUni.highlight || ""}
              onChange={(e) => update("educationUni", { ...value.educationUni, highlight: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label>SMA / SMK</Label>
            <Input
              value={value.educationHs.school}
              onChange={(e) => update("educationHs", { ...value.educationHs, school: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Periode</Label>
            <Input
              value={value.educationHs.period}
              onChange={(e) => update("educationHs", { ...value.educationHs, period: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="md:col-span-3">
            <Label>Highlight</Label>
            <Input
              value={value.educationHs.highlight || ""}
              onChange={(e) => update("educationHs", { ...value.educationHs, highlight: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Work Experiences */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Pengalaman Kerja</h3>
        {value.work.map((w, idx) => (
          <div key={`work-${idx}`} className="border rounded-lg p-4 border-[#374151]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Posisi</Label>
                <Input
                  value={w.position}
                  onChange={(e) => updateWork(idx, { position: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Perusahaan/Institusi</Label>
                <Input
                  value={w.organization}
                  onChange={(e) => updateWork(idx, { organization: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Periode</Label>
                <Input
                  value={w.period}
                  onChange={(e) => updateWork(idx, { period: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="mt-3">
              <Label>Pencapaian (1 baris = 1 bullet)</Label>
              <Textarea
                value={w.bullets}
                onChange={(e) => updateWork(idx, { bullets: e.target.value })}
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end mt-3">
              <Button variant="outline" size="sm" onClick={() => removeWork(idx)}>
                Hapus
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addWork}>
          + Tambah Pengalaman
        </Button>
      </div>

      {/* Organizational Experiences */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Pengalaman Organisasi</h3>
        {value.org.map((w, idx) => (
          <div key={`org-${idx}`} className="border rounded-lg p-4 border-[#374151]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Peran</Label>
                <Input
                  value={w.position}
                  onChange={(e) => updateOrg(idx, { position: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Organisasi</Label>
                <Input
                  value={w.organization}
                  onChange={(e) => updateOrg(idx, { organization: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Periode</Label>
                <Input value={w.period} onChange={(e) => updateOrg(idx, { period: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div className="mt-3">
              <Label>Pencapaian (1 baris = 1 bullet)</Label>
              <Textarea
                value={w.bullets}
                onChange={(e) => updateOrg(idx, { bullets: e.target.value })}
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end mt-3">
              <Button variant="outline" size="sm" onClick={() => removeOrg(idx)}>
                Hapus
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addOrg}>
          + Tambah Organisasi
        </Button>
      </div>

      {/* Honors & Awards */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Honors & Awards</h3>
        {value.awards.map((a, idx) => (
          <div key={`award-${idx}`} className="border rounded-lg p-4 border-[#374151]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <Label>Judul</Label>
                <Input value={a.title} onChange={(e) => updateAward(idx, { title: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Waktu</Label>
                <Input
                  value={a.period}
                  onChange={(e) => updateAward(idx, { period: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-3">
                <Label>Penyelenggara/Pemberi</Label>
                <Input
                  value={a.organizer}
                  onChange={(e) => updateAward(idx, { organizer: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-3">
                <Label>Deskripsi Singkat</Label>
                <Textarea
                  value={a.description}
                  onChange={(e) => updateAward(idx, { description: e.target.value })}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button variant="outline" size="sm" onClick={() => removeAward(idx)}>
                Hapus
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addAward}>
          + Tambah Penghargaan
        </Button>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label>Language</Label>
            <Textarea
              value={value.skills.language}
              onChange={(e) => update("skills", { ...value.skills, language: e.target.value })}
              rows={3}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Software</Label>
            <Textarea
              value={value.skills.software}
              onChange={(e) => update("skills", { ...value.skills, software: e.target.value })}
              rows={3}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Others (1 baris = 1 bullet)</Label>
            <Textarea
              value={value.skills.others}
              onChange={(e) => update("skills", { ...value.skills, others: e.target.value })}
              rows={3}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
