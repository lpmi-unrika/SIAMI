
window.SIAMI_PREVIEW = {
  SESSION_KEY: "siamiPreviewSession",
  ASSIGNMENT_KEY: "siami_preview_assignment",
  EVIDENCE_KEY: "siami_preview_auditee_evidence",
  UNITS_KEY: "siami_preview_units_25",
  AUDITEE_ITEM_KEY: "siami_preview_auditee_item_data",
  APPROVAL_KEY: "siami_preview_eapprovals",

  defaultUnits(){
    return Array.from({length:25},(_,i)=>({
      id:`U${String(i+1).padStart(2,"0")}`,
      name:`Unit ${String(i+1).padStart(2,"0")}`,
      faculty:"",
      active:true
    }));
  },

  json(key, fallback=null){
    try{return JSON.parse(localStorage.getItem(key)||"null") ?? fallback}catch(e){return fallback}
  },

  units(){
    return this.json(this.UNITS_KEY, this.defaultUnits());
  },

  ensureUnits(){
    if(!localStorage.getItem(this.UNITS_KEY)){
      localStorage.setItem(this.UNITS_KEY,JSON.stringify(this.defaultUnits()));
    }
    return this.units();
  },

  saveUnits(units){
    localStorage.setItem(this.UNITS_KEY,JSON.stringify(units));
  },

  emptyAssignment(){
    return {
      unitId:"",
      unitName:"",
      faculty:"",
      auditeeName:"",
      leadAuditor:"",
      memberAuditor:"",
      auditDate:"",
      location:"Universitas Riau Kepulauan",
      auditId:"",
      period:"AMI 2026",
      academicYear:"2025/2026",
      updatedAt:null
    };
  },

  session(){
    try{
      return JSON.parse(sessionStorage.getItem(this.SESSION_KEY)||localStorage.getItem(this.SESSION_KEY)||"null")
    }catch(e){return null}
  },

  assignment(){
    return this.json(this.ASSIGNMENT_KEY, this.emptyAssignment());
  },

  hasAssignment(){
    const a=this.assignment();
    return Boolean(a && a.unitId && a.unitName);
  },

  evidence(){
    return this.json(this.EVIDENCE_KEY,{});
  },

  saveEvidence(data){
    localStorage.setItem(this.EVIDENCE_KEY,JSON.stringify(data));
  },

  evidenceKey(unitId,itemNo,index){return `${unitId}:${itemNo}:${index}`},


  auditeeItems(){
    return this.json(this.AUDITEE_ITEM_KEY,{});
  },

  saveAuditeeItems(data){
    localStorage.setItem(this.AUDITEE_ITEM_KEY,JSON.stringify(data));
  },

  approvals(){
    return this.json(this.APPROVAL_KEY,{});
  },

  saveApprovals(data){
    localStorage.setItem(this.APPROVAL_KEY,JSON.stringify(data));
  },

  approvalKey(kind,docKey){
    return `${kind}:${docKey}`;
  },

  approve(kind,docKey,documentLabel){
    const s=this.session()||{};
    const a=this.assignment();
    const all=this.approvals();
    const k=this.approvalKey(kind,docKey);
    const now=new Date();
    const rec={
      key:k,
      kind,
      docKey,
      documentLabel,
      status:"approved",
      signerName:s.name || a.auditeeName || "Wakil Auditi",
      signerRole:"Wakil Auditi / Auditee",
      unitId:a.unitId || "",
      unitName:a.unitName || "",
      auditId:a.auditId || "",
      documentVersion:1,
      approvedAt:now.toISOString(),
      approvedDate:now.toISOString().slice(0,10),
      preview:true
    };
    all[k]=rec;
    this.saveApprovals(all);
    return rec;
  },

  approval(kind,docKey){
    return this.approvals()[this.approvalKey(kind,docKey)] || null;
  },

  fmtDateTime(value){
    if(!value)return "-";
    const d=new Date(value);
    if(Number.isNaN(d.getTime()))return "-";
    return d.toLocaleString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
  },

  roleHome(role){
    if(role==="admin")return "monitoring.html";
    if(role==="auditee")return "auditee.html";
    return "dashboard.html";
  },

  logout(){
    sessionStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.SESSION_KEY);
    location.href="index.html";
  },

  resetAuditOnly(){
    [
      "siami_preview_form1b_2026",
      "siami_preview_form2_2026",
      "siami_preview_form3_2026",
      "siami_preview_form4_2026"
    ].forEach(k=>localStorage.removeItem(k));
  },

  resetCurrentAssignment(){
    this.resetAuditOnly();
    localStorage.removeItem(this.ASSIGNMENT_KEY);
  },

  resetAll(){
    this.resetAuditOnly();
    localStorage.removeItem(this.EVIDENCE_KEY);
    localStorage.removeItem(this.ASSIGNMENT_KEY);
    localStorage.removeItem(this.UNITS_KEY);
    localStorage.removeItem(this.AUDITEE_ITEM_KEY);
    localStorage.removeItem(this.APPROVAL_KEY);
    localStorage.removeItem("siamiPreviewIdentity");
    localStorage.removeItem("siamiPreviewRole");
    sessionStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.SESSION_KEY);
  },

  escape(s){
    return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
  }
};
SIAMI_PREVIEW.ensureUnits();
