import React from "react";
import { useState, useEffect } from "react";

const C={bg:"#1a1a1a",surface:"#242424",surface2:"#2e2e2e",border:"#3a3a3a",primary:"#e8671a",primaryLight:"#3d2010",text:"#f0f0f0",textMuted:"#999",textDim:"#555",successBg:"#1a2e1a",warning:"#f57f17",warningBg:"#2e2200",error:"#c62828",errorBg:"#2e1a1a"};

const MESES_NOMBRES=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
function generarMesesAnio(anio){return MESES_NOMBRES.map((m,i)=>({id:m.toLowerCase()+anio,label:m+" "+anio,tipo:"mensual",anio}));}
const MESES_BASE=[{id:"borrador",label:"Borrador",tipo:"borrador",anio:null}];
function getMeses(anios){return[...MESES_BASE,...anios.flatMap(a=>generarMesesAnio(a))];}

const TIENDAS_DEFAULT=["Antofagasta","Chicureo","Chillan","Costanera","Coyhaique","Curico","La Serena","Laguna","Los Angeles","Marina","Osorno","PAK","Pichilemu","Puerto Montt","Puerto Varas","Pucon","San Fernando","Talca","Trebol","Temuco","Vespucio","Vitacura"];

const EMBAJADORES_DEFAULT=[
  {nombre:"Amanda Cortes",tienda:"Antofagasta"},{nombre:"Kaory Rivera",tienda:"La Serena"},
  {nombre:"Ariel Benavidez",tienda:"Laguna"},{nombre:"Vanessa Munoz",tienda:"Marina"},
  {nombre:"Oscar Carvajal",tienda:"Marina"},{nombre:"Jesus Guillen",tienda:"Vitacura"},
  {nombre:"Denisse Ulloa",tienda:"Chicureo"},{nombre:"Gabriel Van der Molen",tienda:"Costanera"},
  {nombre:"Marcos Lara",tienda:"PAK"},{nombre:"Paula Faundez",tienda:"Vespucio"},
  {nombre:"Javiera Carrasco",tienda:"Pichilemu"},{nombre:"Jose Pedreros",tienda:"Talca"},
  {nombre:"Carolina Parra",tienda:"Chillan"},{nombre:"Sebastian Mellado",tienda:"Trebol"},
  {nombre:"Valeria Gutierrez",tienda:"Trebol"},{nombre:"Ivan Carrasco",tienda:"Los Angeles"},
  {nombre:"Robinson Huillacal",tienda:"Temuco"},{nombre:"Joyce Lizama",tienda:"Pucon"},
  {nombre:"Rocio Munoz",tienda:"Osorno"},{nombre:"Cristian Rivera",tienda:"Puerto Varas"},
  {nombre:"Noel Oviedo",tienda:"Puerto Montt"},{nombre:"Mayurie Barria",tienda:"Coyhaique"},
];

const TRABAJADORES_DEFAULT=[
  {nombre:"Carolina Parra Calzadilla",tienda:"Chillan"},{nombre:"Sofia Ramirez Placencia",tienda:"Chillan"},
  {nombre:"Vicente Guajardo Badilla",tienda:"Chillan"},{nombre:"Tomas Ramirez Ortiz",tienda:"Chillan"},
  {nombre:"Fernanda Ponce Ponce",tienda:"Costanera"},{nombre:"Miranda Cristobal Anibal",tienda:"Costanera"},
  {nombre:"Farias Vicente Alberto",tienda:"Costanera"},{nombre:"Juan Galdame Castro",tienda:"Costanera"},
  {nombre:"Gabriel Van Der Molen",tienda:"Costanera"},{nombre:"Alvaro Jaque Caceres",tienda:"Costanera"},
  {nombre:"Benjamin Lillo Rivera",tienda:"Costanera"},{nombre:"Luis Ibarra Palma",tienda:"Costanera"},
  {nombre:"Isidora Barros Lopez",tienda:"Costanera"},{nombre:"Gabriel Sandoval Sepulveda",tienda:"Trebol"},
  {nombre:"Jerardo Manriquez Poblete",tienda:"Trebol"},{nombre:"Alex Bizama Soto",tienda:"Trebol"},
  {nombre:"Allison Guinez Cuevas",tienda:"Trebol"},{nombre:"Valeria Gutierrez Soto",tienda:"Trebol"},
  {nombre:"Cristobal Torres Peralta",tienda:"Trebol"},{nombre:"Barbara Gonzalez Valenzuela",tienda:"Trebol"},
  {nombre:"Bruno Neira Saravia",tienda:"Trebol"},{nombre:"Sebastian Mellado Castro",tienda:"Trebol"},
  {nombre:"Jorge Reyes Salazar",tienda:"Trebol"},{nombre:"Rodrigo Mery Gonzalez",tienda:"La Serena"},
  {nombre:"Kaory Rivera Robles",tienda:"La Serena"},{nombre:"Camila Gomez Espina",tienda:"La Serena"},
  {nombre:"Catalina Codoceo Contreras",tienda:"La Serena"},{nombre:"Matias Galleguillos Cespedes",tienda:"La Serena"},
  {nombre:"Denhian Veliz Roljas",tienda:"La Serena"},{nombre:"Mauricio Leon Gomez",tienda:"Marina"},
  {nombre:"Vanessa Diaz Chepilla",tienda:"Marina"},{nombre:"Oscar Carvajal",tienda:"Marina"},
  {nombre:"Daniel Medina",tienda:"Marina"},{nombre:"Vildan Alfaro",tienda:"Marina"},
  {nombre:"Constanza Perez",tienda:"Marina"},{nombre:"Vanessa Munoz",tienda:"Marina"},
  {nombre:"Joaquin Gonzalez",tienda:"Marina"},{nombre:"Pablo Canquil Quinenao",tienda:"PAK"},
  {nombre:"Catalina Costa Valladares",tienda:"PAK"},{nombre:"Nadia Lopez",tienda:"PAK"},
  {nombre:"Marco Lara Ruiz",tienda:"PAK"},{nombre:"Matias Salfate",tienda:"PAK"},
  {nombre:"Annais Sassarini",tienda:"PAK"},{nombre:"Katherine Romero",tienda:"PAK"},
  {nombre:"Kirill Llanza",tienda:"PAK"},{nombre:"Maximiliano Vasquez",tienda:"PAK"},
  {nombre:"Javiera Carrasco Arancibia",tienda:"Pichilemu"},{nombre:"Pamela Navarro Melendez",tienda:"Pichilemu"},
  {nombre:"Benjamin Figueroa Perez",tienda:"Pichilemu"},{nombre:"Carmen Gloria Caro Ponce",tienda:"Pichilemu"},
  {nombre:"Pablo Vargas Vargas",tienda:"Pichilemu"},{nombre:"Elizabeth Salinas Castillo",tienda:"Puerto Montt"},
  {nombre:"Noel Oviedo",tienda:"Puerto Montt"},{nombre:"Camila Mansilla Oyarzun",tienda:"Puerto Montt"},
  {nombre:"Nathalie Carmona",tienda:"Puerto Montt"},{nombre:"Karola Toledo Munoz",tienda:"Puerto Montt"},
  {nombre:"Joaquin Ortega Icaza",tienda:"Puerto Varas"},{nombre:"Diego Carrillo Reyes",tienda:"Puerto Varas"},
  {nombre:"Cristian Rivero Linero",tienda:"Puerto Varas"},{nombre:"Carla Rubilar Rios",tienda:"Puerto Varas"},
  {nombre:"Joyce Lizama Jelvez",tienda:"Pucon"},{nombre:"Daniela Vilches Valenzuela",tienda:"Pucon"},
  {nombre:"Maria Jose Massri Mora",tienda:"Pucon"},{nombre:"Patricia Tureupil Cisterna",tienda:"Pucon"},
  {nombre:"Jesus Guillen Jerez",tienda:"Vitacura"},{nombre:"Valentina Saa Pino",tienda:"Vitacura"},
  {nombre:"Florencia Toro Junginger",tienda:"Vitacura"},{nombre:"Talia Godoy Jofre",tienda:"Vitacura"},
  {nombre:"Cristell Santillan Nestarez",tienda:"Vitacura"},{nombre:"Fabiola Quispe Toribio",tienda:"Vitacura"},
  {nombre:"Javiera Ugas Balbontin",tienda:"Antofagasta"},{nombre:"Claudia Vargas Alfaro",tienda:"Antofagasta"},
  {nombre:"Ingrid Becerra",tienda:"Antofagasta"},{nombre:"Gianella Mondaca Loayza",tienda:"Antofagasta"},
  {nombre:"Amanda Cortes Hiche",tienda:"Antofagasta"},{nombre:"Nadia Veliz Munoz",tienda:"Antofagasta"},
  {nombre:"Marcela Munoz Concha",tienda:"Coyhaique"},{nombre:"Natalia Levicoy Azocar",tienda:"Coyhaique"},
  {nombre:"Mayurie Barria Levipani",tienda:"Coyhaique"},{nombre:"Ignacia Echaveguren Nahuelcar",tienda:"Coyhaique"},
  {nombre:"Lucas Mella Diaz",tienda:"Coyhaique"},{nombre:"Gustavo Lastra Pereira",tienda:"Talca"},
  {nombre:"Juan Molina Munoz",tienda:"Talca"},{nombre:"Jose Pedreros Sarabia",tienda:"Talca"},
  {nombre:"Pia Valenzuela Garcia",tienda:"Talca"},{nombre:"Christofer Nunez Flores",tienda:"Talca"},
  {nombre:"Benjamin Villalobos Reyes",tienda:"Talca"},{nombre:"Denisse Ulloa Bonnet",tienda:"Chicureo"},
  {nombre:"Judith Bastias Hernandez",tienda:"Chicureo"},{nombre:"Eduardo Miranda Rojas",tienda:"Chicureo"},
  {nombre:"Patricio Nunez Perez",tienda:"Osorno"},{nombre:"Miguel Munoz Aguilar",tienda:"Osorno"},
  {nombre:"Natalia Ojeda Hohmann",tienda:"Osorno"},{nombre:"Rocio Munoz Mieras",tienda:"Osorno"},
  {nombre:"Pamela Molina",tienda:"Temuco"},{nombre:"Robin Huillical",tienda:"Temuco"},
  {nombre:"Margarita Carvajal",tienda:"Temuco"},{nombre:"Maria Jesus Zapata Cares",tienda:"Temuco"},
  {nombre:"Ariel Benavidez",tienda:"Laguna"},{nombre:"Matias Guajardo",tienda:"Laguna"},
  {nombre:"Natalia Molina",tienda:"Laguna"},{nombre:"Martin Moraga Torrealba",tienda:"Laguna"},
  {nombre:"Josefa Schutte",tienda:"Laguna"},{nombre:"Jesus Macaya",tienda:"Laguna"},
  {nombre:"Ivan Carrasco",tienda:"Los Angeles"},{nombre:"Wilson Padilla",tienda:"Los Angeles"},
  {nombre:"Ruth Castaneda",tienda:"Los Angeles"},{nombre:"Catalina Guzman",tienda:"Los Angeles"},
  {nombre:"Catalina Gallegos",tienda:"Los Angeles"},{nombre:"Muriel Encina Moreno",tienda:"Vespucio"},
  {nombre:"Paula Faundez Palominos",tienda:"Vespucio"},{nombre:"Sebastian Gutierrez Casado",tienda:"Vespucio"},
  {nombre:"Javiera Arancibia Contreras",tienda:"Vespucio"},{nombre:"Jorge Caroca",tienda:"Curico"},
  {nombre:"Tiare Diaz",tienda:"Curico"},{nombre:"Constanza Bobadilla",tienda:"Curico"},
  {nombre:"Pedro Diaz",tienda:"Curico"},{nombre:"Carlos Aragon",tienda:"Curico"},
  {nombre:"Christian Guevara",tienda:"Curico"},
];

const PRUEBA_DEFAULT={
  version:"Borrador",
  preguntas:[
    {id:1,seccion:"Verdadero o Falso",texto:"Ante un quiebre de stock en Pasillo Infinito, el vendedor debe contactar por llamada y correo al cliente.",tipo:"vof",correcta:"Verdadero"},
    {id:2,seccion:"Verdadero o Falso",texto:"Si entregas un pedido pick up sin marcarlo como retirado, figurara pendiente para SAC.",tipo:"vof",correcta:"Verdadero"},
    {id:3,seccion:"Verdadero o Falso",texto:"Es posible hacer Pasillo Infinito con despacho a Mallplaza Trebol si el cliente trabaja alli.",tipo:"vof",correcta:"Falso"},
    {id:4,seccion:"Verdadero o Falso",texto:"Si un influencer llega ofreciendo colaboracion, el Jefe de Tienda puede entregar el producto en ese momento.",tipo:"vof",correcta:"Falso"},
    {id:5,seccion:"Verdadero o Falso",texto:"El Seguro de Accidentes es de reembolso; el afectado debe usar primero su prevision.",tipo:"vof",correcta:"Verdadero"},
    {id:6,seccion:"Seleccion Multiple",texto:"Cliente de regiones compra por Pasillo Infinito. Que modalidad de despacho usas en Shopify?",tipo:"alternativas",opciones:["Envio Express","Retiro en tienda","Same day","Bluexpress (estandar)"],correcta:"Bluexpress (estandar)"},
    {id:7,seccion:"Seleccion Multiple",texto:"Mochila Baku M: forro con piquetes y tirador roto. Que cubre la Garantia de por Vida?",tipo:"alternativas",opciones:["No cubre nada.","Cubre ambos danos.","No cubre; garantia empezo en octubre.","Cubre solo el tirador, no el forro."],correcta:"Cubre solo el tirador, no el forro."},
    {id:8,seccion:"Seleccion Multiple",texto:"Chaqueta en mal estado, sin stock. Cliente acepta cambio por una mas cara. Como procedes?",tipo:"alternativas",opciones:["Cobrar diferencia.","Derivar a SAC.","Cambio con descuento al precio original.","Descuento del 20%."],correcta:"Cambio con descuento al precio original."},
    {id:9,seccion:"Seleccion Multiple",texto:"Cliente adulto mayor sin correo exige boleta fisica. Que haces?",tipo:"alternativas",opciones:["Explicar que no se emiten papeles.","Entregar voucher o imprimir desde Shopify.","Llamar al encargado para boleta manual.","Registrar RUT."],correcta:"Entregar voucher o imprimir desde Shopify."},
    {id:10,seccion:"Seleccion Multiple",texto:"Clienta pregunta si la Essential Puffa es de segunda mano por ser de poliester reciclado. Que respondes?",tipo:"alternativas",opciones:["No es usada; el poliester reciclado transforma botellas en fibra nueva.","Es de segunda mano con limpieza profunda.","Es 100% biodegradable.","La tela absorbe CO2 del ambiente."],correcta:"No es usada; el poliester reciclado transforma botellas en fibra nueva."},
    {id:11,seccion:"Desarrollo",texto:"Wild Lama es Empresa B Certificada. Que significa y como se diferencia de una empresa tradicional?",tipo:"desarrollo"},
  ]
};

const SK="wl_resultados_prueba",PK="wl_prueba_config",TK="wl_tiendas";
const WK="wl_trabajadores",EK="wl_embajadores",FK="wl_feedback",RK="wl_refuerzo";
const PMK="wl_pruebas_mensuales",CK="wl_contrasenas",MCK="wl_meses_config";
const ADMIN_PASS_DEFAULT="wildlama2026",EMB_PASS_DEFAULT="embajador2026";

const SUPABASE_URL="https://mmumkccyernmsgoohdvx.supabase.co";
const SUPABASE_KEY="sb_publishable_KmQSDiCkweEswcaoCPbG4A_oEhfhTRl";

async function sgSB(k,v){
  try{
    const r=await fetch(SUPABASE_URL+"/rest/v1/wl_data?on_conflict=key",{
      method:"POST",
      headers:{"Content-Type":"application/json","apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY,"Prefer":"resolution=merge-duplicates"},
      body:JSON.stringify({key:k,value:JSON.stringify(v),updated_at:new Date().toISOString()})
    });
    return r.ok;
  }catch{return false;}
}

async function ldSB(k,d){
  try{
    const r=await fetch(SUPABASE_URL+"/rest/v1/wl_data?key=eq."+encodeURIComponent(k)+"&select=value",{
      headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY}
    });
    const data=await r.json();
    if(data&&data.length>0&&data[0].value)return JSON.parse(data[0].value);
    return d;
  }catch{return d;}
}

async function sg(k,v){return sgSB(k,v);}
async function ld(k,d){return ldSB(k,d);}
async function ldResultados(){
  try{
    const r=await fetch(SUPABASE_URL+"/rest/v1/wl_data?select=key,value&order=created_at.asc",{
      headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY,"Accept":"application/json"}
    });
    const data=await r.json();
    const sr={};
    if(data&&data.length>0){
      data.filter(row=>row.key&&row.key.startsWith("wl_res_")).forEach(row=>{
        try{
          const res=JSON.parse(row.value);
          const parts=row.key.split("__");
          const mesId=parts[0].replace("wl_res_","");
          if(!sr[mesId])sr[mesId]=[];
          sr[mesId].push(res);
        }catch{}
      });
    }
    // Migrate legacy wl_resultados_prueba if exists
    const legacy=await ldSB("wl_resultados_prueba",null);
    if(legacy){
      let legacyObj={};
      if(Array.isArray(legacy)){legacyObj={borrador:legacy};}
      else if(legacy&&typeof legacy==="object"){Object.entries(legacy).forEach(([k,v])=>{legacyObj[k]=Array.isArray(v)?v:[];});}
      Object.entries(legacyObj).forEach(([mesId,arr])=>{
        arr.forEach(res=>{
          const rkey="wl_res_"+mesId+"__"+res.nombre.replace(/\s/g,"_")+"__"+Date.now();
          const exists=sr[mesId]&&sr[mesId].some(x=>x.nombre===res.nombre&&x.fecha===res.fecha);
          if(!exists){
            if(!sr[mesId])sr[mesId]=[];
            sr[mesId].push(res);
          }
        });
      });
    }
    return sr;
  }catch(e){console.error("ldResultados error:",e);return {};}
}
async function sgRes(mesId,res){
  const rkey="wl_res_"+mesId+"__"+res.nombre.replace(/\s/g,"_")+"__"+new Date().getTime();
  return sgSB(rkey,res);
}
function med(arr){if(!arr.length)return 0;const s=[...arr].sort((a,b)=>a-b),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;}
const mkKey=(n,v)=>n.replace(/\s/g,"_")+"__"+v.replace(/\s/g,"_");
const pColor=(p)=>p>=8?"#4caf50":p>=6?C.warning:C.error;
const pBg=(p)=>p>=8?C.successBg:p>=6?C.warningBg:C.errorBg;
const safeArr=(v)=>Array.isArray(v)?v:[];
const ss=(mb=0)=>({width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid "+C.border,fontSize:14,boxSizing:"border-box",background:C.surface2,color:C.text,marginBottom:mb});
const bP={background:C.primary,color:"#fff",border:"none",borderRadius:10,padding:"13px 0",fontSize:15,fontWeight:700,cursor:"pointer",width:"100%",marginBottom:12};
const bEmb={background:"transparent",color:C.primary,border:"2px solid "+C.primary,borderRadius:10,padding:"13px 0",fontSize:15,fontWeight:700,cursor:"pointer",width:"100%"};

function ToastGuardado({msg}){
  return(
    <div style={{position:"fixed",bottom:24,right:24,background:"#1a3a1a",border:"1px solid #4caf50",borderRadius:10,padding:"12px 20px",color:"#4caf50",fontWeight:700,fontSize:14,zIndex:9999,boxShadow:"0 4px 16px #0006"}}>
      ok {msg||"Guardado correctamente"}
    </div>
  );
}

let xlsxReady=false;
function loadXLSX(cb){
  if(xlsxReady&&window.XLSX){cb();return;}
  var scr=document.createElement("script");
  scr.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
  scr.onload=function(){xlsxReady=true;cb();};
  document.head.appendChild(scr);
}
function descargarExcel(label,rows,prueba,refs,fbs){
  loadXLSX(function(){
    var X=window.XLSX;
    var wb=X.utils.book_new();
    var f1=[["Nombre","Tienda","Puntaje","Total","Fecha"]];
    for(var i=0;i<rows.length;i++){var r=rows[i];f1.push([r.nombre,r.tienda,r.puntaje,r.total,r.fecha]);}
    X.utils.book_append_sheet(wb,X.utils.aoa_to_sheet(f1),"Resultados");
    var suma=0;for(var j=0;j<rows.length;j++){suma+=rows[j].puntaje;}
    var prom=rows.length?(suma/rows.length).toFixed(2):0;
    var f2=[["Prueba",label],["Total",rows.length],["Promedio",prom]];
    X.utils.book_append_sheet(wb,X.utils.aoa_to_sheet(f2),"Estadisticas");
    if(prueba){
      var pregs=prueba.preguntas.filter(function(p){return p.tipo!=="desarrollo";});
      var f3=[["N","Pregunta","Correctas","Total","Acierto","Respuesta correcta"]];
      for(var k=0;k<pregs.length;k++){
        var p=pregs[k];
        var tot=0,cor=0;
        for(var m=0;m<rows.length;m++){if(rows[m].respuestas&&rows[m].respuestas[p.id]!==undefined)tot++;if(rows[m].respuestas&&rows[m].respuestas[p.id]===p.correcta)cor++;}
        f3.push([k+1,p.texto,cor,tot,tot>0?((cor/tot)*100).toFixed(1)+"%":"-",p.correcta]);
        var ops=p.tipo==="vof"?["Verdadero","Falso"]:(p.opciones||[]);
        for(var n=0;n<ops.length;n++){
          var op=ops[n];var c=0;
          for(var o=0;o<rows.length;o++){if(rows[o].respuestas&&rows[o].respuestas[p.id]===op)c++;}
          f3.push(["","",op===p.correcta?">> CORRECTA: "+op:"   "+op,c,"",""]);
        }
        f3.push(["","","","","",""]);
      }
      X.utils.book_append_sheet(wb,X.utils.aoa_to_sheet(f3),"Preguntas");
    }
    var f4=[["Nombre","Tienda","Refuerzo","Fb Teorico","Fb RolePlay","Fb Notion","Fb Casos","Comentario"]];
    for(var q=0;q<rows.length;q++){
      var rv=rows[q];var key=mkKey(rv.nombre,rv.version);var fb=fbs[key];
      f4.push([rv.nombre,rv.tienda,refs[key]||"",fb?fb.teorico?"Si":"-":"-",fb?fb.roleplay?"Si":"-":"-",fb?fb.notion?"Si":"-":"-",fb?fb.aplicacion?"Si":"-":"-",fb?fb.comentario||"":""]);
    }
    X.utils.book_append_sheet(wb,X.utils.aoa_to_sheet(f4),"Refuerzo");
    var f5=[["Nombre","Tienda","Desarrollo"]];
    for(var s2=0;s2<rows.length;s2++){if(rows[s2].desarrollo)f5.push([rows[s2].nombre,rows[s2].tienda,rows[s2].desarrollo]);}
    X.utils.book_append_sheet(wb,X.utils.aoa_to_sheet(f5),"Desarrollo");
    X.writeFile(wb,"Informe_"+label+".xlsx");
  });
}

function BarChart({data,max}){
  return(
    <div style={{marginTop:8}}>
      {data.map((d,i)=>(
        <div key={i} style={{marginBottom:5,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:11,color:C.textMuted,width:180,flexShrink:0,textAlign:"right",paddingRight:8,lineHeight:1.3}}>
            {d.correcta&&<span style={{color:"#4caf50",marginRight:4}}>v</span>}
            {d.label.length>28?d.label.substring(0,28)+"...":d.label}
          </span>
          <div style={{flex:1,background:C.border,borderRadius:4,height:20}}>
            <div style={{width:(max>0?(d.count/max)*100:0)+"%",background:d.correcta?"#4caf50":C.primary,borderRadius:4,height:"100%"}}/>
          </div>
          <span style={{fontSize:11,color:C.textMuted,width:65,flexShrink:0}}>{d.count} ({max>0?((d.count/max)*100).toFixed(1):0}%)</span>
        </div>
      ))}
    </div>
  );
}

function DistChart({puntajes,total}){
  const counts=Array(total+1).fill(0);
  puntajes.forEach(p=>{if(p>=0&&p<=total)counts[p]++;});
  const maxC=Math.max(...counts,1);
  return(
    <div>
      <div style={{display:"flex",alignItems:"flex-end",gap:4,height:90,paddingBottom:4}}>
        {counts.map((c,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{fontSize:9,color:C.textMuted,marginBottom:2}}>{c>0?c:""}</div>
            <div style={{width:"100%",background:c>0?C.primary:C.border,borderRadius:"3px 3px 0 0",height:((c/maxC)*100)+"%",minHeight:c>0?4:0}}/>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:4}}>{counts.map((_,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:9,color:C.textMuted}}>{i}</div>)}</div>
      <div style={{textAlign:"center",fontSize:11,color:C.textDim,marginTop:4}}>Puntuacion obtenida</div>
    </div>
  );
}

function StatCards({res}){
  const pts=res.map(r=>r.puntaje);
  const prom=pts.length?(pts.reduce((a,b)=>a+b,0)/pts.length).toFixed(2):"-";
  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:16}}>
      {[{l:"Evaluaciones",v:res.length},{l:"Promedio",v:prom+"/10"},{l:"Mediana",v:(pts.length?med(pts):"-")+"/10"},{l:"Intervalo",v:pts.length?Math.min(...pts)+"-"+Math.max(...pts):"-"}].map(c=>(
        <div key={c.l} style={{background:C.surface,borderRadius:10,padding:14,textAlign:"center",border:"1px solid "+C.border}}>
          <div style={{fontSize:20,fontWeight:800,color:C.primary}}>{c.v}</div>
          <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{c.l}</div>
        </div>
      ))}
    </div>
  );
}

function getStats(res,prb){
  if(!prb||!res.length)return null;
  const pregs=prb.preguntas.filter(p=>p.tipo!=="desarrollo");
  const statsPQ=pregs.map(p=>{
    const tot=res.filter(r=>r.respuestas&&r.respuestas[p.id]!==undefined).length;
    const cor=res.filter(r=>r.respuestas&&r.respuestas[p.id]===p.correcta).length;
    const dist=p.tipo==="vof"
      ?["Verdadero","Falso"].map(op=>({label:op,count:res.filter(r=>r.respuestas&&r.respuestas[p.id]===op).length,correcta:op===p.correcta}))
      :(p.opciones||[]).map(op=>({label:op,count:res.filter(r=>r.respuestas&&r.respuestas[p.id]===op).length,correcta:op===p.correcta}));
    return{...p,total:tot,correctas:cor,pct:tot>0?((cor/tot)*100).toFixed(1):"-",dist};
  });
  return{statsPQ,masErrores:[...statsPQ].sort((a,b)=>a.correctas-b.correctas).slice(0,3)};
}

function VendedorDetalle({nombre,onVolver,mesesConDatos,resultados,refuerzos,feedbacks}){
  const historial=mesesConDatos.map(m=>{
    const res=safeArr(resultados[m.id]).find(r=>r.nombre===nombre);
    if(!res)return null;
    return{mes:m.label,puntaje:res.puntaje,total:res.total,fecha:res.fecha,desarrollo:res.desarrollo,rk:mkKey(res.nombre,res.version),fk:mkKey(res.nombre,res.version)};
  }).filter(Boolean);
  const pts=historial.map(h=>h.puntaje);
  const prom=pts.length?(pts.reduce((a,b)=>a+b,0)/pts.length).toFixed(1):"-";
  const maxPts=historial[0]?.total||10;
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <button onClick={onVolver} style={{background:C.surface,border:"1px solid "+C.border,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:13,color:C.textMuted}}>Volver</button>
        <div>
          <h2 style={{color:C.text,margin:0,fontSize:18}}>{nombre}</h2>
          <p style={{color:C.textMuted,fontSize:13,margin:0}}>{historial.length} prueba(s)</p>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:10,marginBottom:20}}>
        {[{l:"Promedio",v:prom+"/10"},{l:"Mejor",v:(pts.length?Math.max(...pts):"-")+"/10"},{l:"Menor",v:(pts.length?Math.min(...pts):"-")+"/10"},{l:"Pruebas",v:historial.length}].map(c=>(
          <div key={c.l} style={{background:C.surface,borderRadius:10,padding:14,textAlign:"center",border:"1px solid "+C.border}}>
            <div style={{fontSize:20,fontWeight:800,color:C.primary}}>{c.v}</div>
            <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{c.l}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.surface,borderRadius:12,padding:20,marginBottom:16,border:"1px solid "+C.border}}>
        <h3 style={{marginTop:0,color:C.text,fontSize:13,marginBottom:16}}>Evolucion de puntajes</h3>
        <div style={{display:"flex",alignItems:"flex-end",gap:8,height:100}}>
          {historial.map((h,i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{fontSize:11,fontWeight:700,color:C.primary}}>{h.puntaje}</div>
              <div style={{width:"100%",background:pColor(h.puntaje),borderRadius:"4px 4px 0 0",height:((h.puntaje/maxPts)*100)+"%",minHeight:4}}/>
              <div style={{fontSize:10,color:C.textDim,textAlign:"center"}}>{h.mes.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>
      {historial.map((h,i)=>{
        const fb=feedbacks[h.fk];
        return(
          <div key={i} style={{background:C.surface,borderRadius:12,padding:18,marginBottom:10,border:"1px solid "+C.border}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div><div style={{fontWeight:700,color:C.text,fontSize:14}}>{h.mes}</div><div style={{fontSize:12,color:C.textMuted}}>{h.fecha}</div></div>
              <div style={{background:pBg(h.puntaje),borderRadius:8,padding:"5px 12px",fontWeight:800,fontSize:16,color:pColor(h.puntaje)}}>{h.puntaje}/{h.total}</div>
            </div>
            {refuerzos[h.rk]&&<div style={{background:C.warningBg,borderRadius:8,padding:10,marginBottom:8}}><div style={{fontSize:11,fontWeight:600,color:C.warning,marginBottom:4}}>Puntos a reforzar</div><div style={{fontSize:12,color:C.text,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{refuerzos[h.rk]}</div></div>}
            {fb&&<div style={{background:C.surface2,borderRadius:8,padding:10,marginBottom:8}}>
              <div style={{fontSize:11,color:C.textMuted,marginBottom:5}}>Feedback: {fb.embajador} - {fb.fecha}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:fb.comentario?5:0}}>
                {[["teorico","Teorico"],["roleplay","Role-Play"],["notion","Notion"],["aplicacion","Casos reales"]].map(([k,l])=>(
                  <span key={k} style={{fontSize:11,padding:"2px 7px",borderRadius:5,background:fb[k]?C.successBg:C.errorBg,color:fb[k]?"#4caf50":C.error}}>{fb[k]?"ok":"-"} {l}</span>
                ))}
              </div>
              {fb.comentario&&<div style={{fontSize:12,color:C.textMuted,marginTop:4}}>{fb.comentario}</div>}
            </div>}
            {h.desarrollo&&<div style={{background:C.surface2,borderRadius:8,padding:8,fontSize:12,color:C.textMuted}}><strong style={{color:C.text}}>Desarrollo:</strong> {h.desarrollo}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function App(){
  const [vista,setVista]=useState("inicio");
  const [prueba,setPrueba]=useState(null);
  const [pruebasMes,setPruebasMes]=useState({});
  const [anios,setAnios]=useState([2026]);
  const [mesesConfig,setMesesConfig]=useState({inactivas:[]});
  const [tiendas,setTiendas]=useState([]);
  const [trabajadores,setTrabajadores]=useState([]);
  const [embajadores,setEmbajadores]=useState([]);
  const [feedbacks,setFeedbacks]=useState({});
  const [refuerzos,setRefuerzos]=useState({});
  const [refuerzoEdit,setRefuerzoEdit]=useState({});
  const [guardandoRF,setGuardandoRF]=useState(null);
  const [tienda,setTienda]=useState("");
  const [nombre,setNombre]=useState("");
  const [respuestas,setRespuestas]=useState({});
  const [dificultad,setDificultad]=useState(null);
  const [comentario,setComentario]=useState("");
  const [puntaje,setPuntaje]=useState(null);
  const [guardadoOk,setGuardadoOk]=useState(null);
  const [resultados,setResultados]=useState({});
  const [guardando,setGuardando]=useState(false);
  const [tiempo,setTiempo]=useState(15*60);
  const [filtroTienda,setFiltroTienda]=useState("Todas");
  const [adminPass,setAdminPass]=useState("");
  const [adminError,setAdminError]=useState(false);
  const [adminSec,setAdminSec]=useState("pruebas");
  const [adminTab,setAdminTab]=useState("menu");
  const [mesActivo,setMesActivo]=useState(null);
  const [mesSubTab,setMesSubTab]=useState("inf");
  const [editPrueba,setEditPrueba]=useState(null);
  const [guardandoPrueba,setGuardandoPrueba]=useState(false);
  const [loading,setLoading]=useState(true);
  const [nuevaTienda,setNuevaTienda]=useState("");
  const [nuevoTrab,setNuevoTrab]=useState({nombre:"",tienda:""});
  const [tiendaExp,setTiendaExp]=useState(null);
  const [nuevoEmb,setNuevoEmb]=useState({nombre:"",tienda:""});
  const [filtroVT,setFiltroVT]=useState("Todas");
  const [embPass,setEmbPass]=useState("");
  const [embError,setEmbError]=useState(false);
  const [embTienda,setEmbTienda]=useState("");
  const [embNombre,setEmbNombre]=useState("");
  const [fbAbierto,setFbAbierto]=useState(null);
  const [fbForm,setFbForm]=useState({teorico:false,roleplay:false,notion:false,aplicacion:false,comentario:""});
  const [guardandoFb,setGuardandoFb]=useState(false);
  const [mesVendedor,setMesVendedor]=useState("borrador");
  const [vendedorDetalle,setVendedorDetalle]=useState(null);
  const [toast,setToast]=useState(null);
  const [contrasenas,setContrasenas]=useState({admin:ADMIN_PASS_DEFAULT,embajador:EMB_PASS_DEFAULT});
  const [passForm,setPassForm]=useState({adminActual:"",adminNueva:"",adminConfirm:"",embNueva:"",embConfirm:""});
  const [passMsg,setPassMsg]=useState({admin:"",emb:""});
  const [tiendasDraft,setTiendasDraft]=useState(null);
  const [trabDraft,setTrabDraft]=useState(null);
  const [embDraft,setEmbDraft]=useState(null);
  const [equipoCambiado,setEquipoCambiado]=useState(false);
  const [guardandoEquipo,setGuardandoEquipo]=useState(false);
  const [modalCierre,setModalCierre]=useState(null);
  const [selNoPresentados,setSelNoPresentados]=useState({});

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),2500);};

  useEffect(()=>{
    Promise.all([ld(PK,PRUEBA_DEFAULT),ld(TK,TIENDAS_DEFAULT),ld(WK,TRABAJADORES_DEFAULT),ld(EK,EMBAJADORES_DEFAULT),ld(FK,{}),ld(RK,{}),ldResultados(),ld(PMK,{}),ld(CK,{admin:ADMIN_PASS_DEFAULT,embajador:EMB_PASS_DEFAULT}),ld(MCK,{inactivas:[],anios:[2026]})])
    .then(([p,t,tr,em,fb,rf,sr,pm,cp,mc])=>{
      setPrueba(p);setTiendas(t);setTrabajadores(tr);setEmbajadores(em);setFeedbacks(fb);setRefuerzos(rf);
      setResultados(sr||{});setPruebasMes(pm);setContrasenas(cp||{admin:ADMIN_PASS_DEFAULT,embajador:EMB_PASS_DEFAULT});
      const mcData=mc||{inactivas:[],anios:[2026]};setMesesConfig(mcData);setAnios(mcData.anios||[2026]);setLoading(false);
    });
  },[]);

  const MESES=getMeses(anios);
  const inactivasSet=new Set(mesesConfig.inactivas||[]);
  const pruebaActiva=pruebasMes[mesVendedor]||(mesVendedor==="borrador"?prueba:null);
  const mesArr=(id)=>safeArr(resultados[id]);
  const allRes=()=>Object.values(resultados).flatMap(v=>safeArr(v));
  const mesesConDatos=MESES.filter(m=>mesArr(m.id).length>0);
  const yaRindio=(nom,mes)=>mesArr(mes).some(r=>r.nombre===nom);

  useEffect(()=>{
    if(vista!=="prueba")return;
    if(tiempo<=0){submitAuto();return;}
    const t=setInterval(()=>setTiempo(s=>s-1),1000);
    return()=>clearInterval(t);
  },[vista,tiempo]);

  const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
  const calcP=()=>pruebaActiva?pruebaActiva.preguntas.filter(p=>p.tipo!=="desarrollo"&&respuestas[p.id]===p.correcta).length:0;
  const totC=()=>pruebaActiva?pruebaActiva.preguntas.filter(p=>p.tipo!=="desarrollo").length:0;
  const buildRes=(auto=false)=>({nombre,tienda,version:pruebaActiva.version,fecha:new Date().toLocaleString("es-CL"),puntaje:calcP(),total:totC(),respuestas,desarrollo:(()=>{const dp=pruebaActiva.preguntas.find(p=>p.tipo==="desarrollo");return dp?respuestas[dp.id]||"":"";})(),dificultad:dificultad||"-",comentario,tiempoAgotado:auto});
  const saveRes=async(r)=>{const ok=await sgRes(mesVendedor,r);if(ok){setResultados(prev=>({...prev,[mesVendedor]:[...safeArr(prev[mesVendedor]),r]}));}return ok;};
  const submitAuto=async()=>{const r=buildRes(true);const ok=await saveRes(r);setPuntaje(r.puntaje);setGuardadoOk(ok);setVista("resultado");};
  const handleSubmit=async()=>{
    if(!tienda||!nombre)return alert("Selecciona tu nombre.");
    const sin=pruebaActiva.preguntas.filter(p=>p.tipo!=="desarrollo"&&!respuestas[p.id]);
    if(sin.length>0)return alert("Te faltan "+sin.length+" pregunta(s).");
    if(!dificultad)return alert("Indica que tan dificil te parecio.");
    setGuardando(true);const r=buildRes();const ok=await saveRes(r);setPuntaje(r.puntaje);setGuardadoOk(ok);setGuardando(false);setVista("resultado");
  };

  const abrirAdmin=(pass)=>{if(pass!==contrasenas.admin){setAdminError(true);return;}setVista("admin");};
  const abrirEmb=(pass)=>{if(pass!==contrasenas.embajador){setEmbError(true);return;}setVista("embajador");};
  const guardarRF=async(n,v)=>{const key=mkKey(n,v);setGuardandoRF(key);const nr={...refuerzos,[key]:refuerzoEdit[key]||""};await sg(RK,nr);setRefuerzos(nr);setGuardandoRF(null);showToast("Puntos a reforzar guardados");};
  const guardarFb=async(n,v)=>{setGuardandoFb(true);const key=mkKey(n,v);const nr={...feedbacks,[key]:{...fbForm,fecha:new Date().toLocaleString("es-CL"),embajador:embNombre}};await sg(FK,nr);setFeedbacks(nr);setGuardandoFb(false);setFbAbierto(null);showToast("Feedback guardado");};
  const guardarPrueba=async()=>{setGuardandoPrueba(true);if(mesActivo==="borrador"){await sg(PK,editPrueba);setPrueba(editPrueba);}else{const n={...pruebasMes,[mesActivo]:editPrueba};await sg(PMK,n);setPruebasMes(n);}setGuardandoPrueba(false);showToast("Prueba guardada");};
  const toggleInactiva=async(mesId)=>{
    const lista=mesesConfig.inactivas||[];
    if(lista.includes(mesId)){
      const nc={...mesesConfig,inactivas:lista.filter(x=>x!==mesId)};
      await sg(MCK,nc);setMesesConfig(nc);showToast("Prueba reactivada");
    } else {
      const resDelMes=mesArr(mesId);
      const tiendasConRes={};
      resDelMes.forEach(r=>{if(!tiendasConRes[r.tienda])tiendasConRes[r.tienda]=[];tiendasConRes[r.tienda].push(r.nombre);});
      const tiendasIncompletas=tiendas.filter(t=>(tiendasConRes[t]||[]).length<2);
      if(tiendasIncompletas.length>0){
        setSelNoPresentados({});
        setModalCierre({mesId,tiendasIncompletas,tiendasConRes});
      } else {
        const nc={...mesesConfig,inactivas:[...lista,mesId]};
        await sg(MCK,nc);setMesesConfig(nc);showToast("Prueba marcada como inactiva");
      }
    }
  };
  const confirmarCierre=async()=>{
    const {mesId}=modalCierre;
    const pruebaDelMes=pruebasMes[mesId]||(mesId==="borrador"?prueba:null);
    const totalPregs=pruebaDelMes?pruebaDelMes.preguntas.filter(p=>p.tipo!=="desarrollo").length:10;
    const nuevosRes=[];
    Object.entries(selNoPresentados).forEach(([tienda,nombres])=>{
      nombres.forEach(nombre=>{
        if(nombre){
          const r={nombre,tienda,version:pruebaDelMes?.version||mesId,fecha:new Date().toLocaleString("es-CL"),puntaje:0,total:totalPregs,respuestas:{},desarrollo:"",dificultad:"-",comentario:"",noPresentado:true};
          nuevosRes.push(r);
        }
      });
    });
    for(const r of nuevosRes){await sgRes(mesId,r);}
    setResultados(prev=>({...prev,[mesId]:[...safeArr(prev[mesId]),...nuevosRes]}));
    const lista=mesesConfig.inactivas||[];
    const nc={...mesesConfig,inactivas:[...lista,mesId]};
    await sg(MCK,nc);setMesesConfig(nc);
    setModalCierre(null);setSelNoPresentados({});
    showToast("Prueba cerrada y no presentados registrados");
  };
  const agregarAnio=async()=>{const nuevoAnio=Math.max(...anios)+1;const nuevosAnios=[...anios,nuevoAnio];const nc={...mesesConfig,anios:nuevosAnios};await sg(MCK,nc);setMesesConfig(nc);setAnios(nuevosAnios);showToast("Año "+nuevoAnio+" agregado");};
  const trabPorTienda=tiendas.reduce((acc,t)=>{acc[t]=trabajadores.filter(w=>w.tienda===t);return acc;},{});
  const globalPorTienda=()=>{const map={};mesesConDatos.forEach(m=>{mesArr(m.id).forEach(r=>{if(!map[r.tienda])map[r.tienda]={tienda:r.tienda,pts:[],count:0};map[r.tienda].pts.push(r.puntaje);map[r.tienda].count++;});});return Object.values(map).map(t=>({...t,prom:(t.pts.reduce((a,b)=>a+b,0)/t.pts.length).toFixed(1)})).sort((a,b)=>b.prom-a.prom);};
  const globalPorVendedor=()=>{const map={};mesesConDatos.forEach(m=>{mesArr(m.id).forEach(r=>{if(!map[r.nombre])map[r.nombre]={nombre:r.nombre,tienda:r.tienda,pts:[],meses:[]};map[r.nombre].pts.push(r.puntaje);map[r.nombre].meses.push(m.label);});});return Object.values(map).map(v=>({...v,prom:(v.pts.reduce((a,b)=>a+b,0)/v.pts.length).toFixed(1)})).sort((a,b)=>b.prom-a.prom);};
  const updatePQ=(id,f,v)=>setEditPrueba(p=>({...p,preguntas:p.preguntas.map(q=>q.id===id?{...q,[f]:v}:q)}));
  const updateOp=(id,idx,v)=>setEditPrueba(p=>({...p,preguntas:p.preguntas.map(q=>{if(q.id!==id)return q;const ops=[...(q.opciones||[])];ops[idx]=v;return{...q,opciones:ops};})}));
  const draftT=()=>tiendasDraft!==null?tiendasDraft:tiendas;
  const draftW=()=>trabDraft!==null?trabDraft:trabajadores;
  const draftE=()=>embDraft!==null?embDraft:embajadores;
  const marcarCambio=()=>setEquipoCambiado(true);
  const agregarTienda=()=>{if(!nuevaTienda.trim()||draftT().includes(nuevaTienda.trim()))return;const n=[...draftT(),nuevaTienda.trim()].sort();setTiendasDraft(n);setNuevaTienda("");marcarCambio();};
  const eliminarTienda=(t)=>{if(!confirm("Eliminar "+t+"?"))return;const n=draftT().filter(x=>x!==t);const nt=draftW().filter(w=>w.tienda!==t);setTiendasDraft(n);setTrabDraft(nt);marcarCambio();};
  const agregarTrab=(tt)=>{if(!nuevoTrab.nombre.trim())return;const n=[...draftW(),{nombre:nuevoTrab.nombre.trim(),tienda:tt}];setTrabDraft(n);setNuevoTrab({nombre:"",tienda:tt});marcarCambio();};
  const eliminarTrab=(idx)=>{const cur=draftW();const n=cur.filter((_,i)=>i!==idx);setTrabDraft(n);marcarCambio();};
  const agregarEmb=()=>{if(!nuevoEmb.nombre.trim()||!nuevoEmb.tienda)return alert("Completa nombre y tienda.");const n=[...draftE(),{nombre:nuevoEmb.nombre.trim(),tienda:nuevoEmb.tienda}];setEmbDraft(n);setNuevoEmb({nombre:"",tienda:""});marcarCambio();};
  const eliminarEmb=(idx)=>{const n=draftE().filter((_,i)=>i!==idx);setEmbDraft(n);marcarCambio();};
  const guardarEquipo=async()=>{
    setGuardandoEquipo(true);
    const t=tiendasDraft!==null?tiendasDraft:tiendas;
    const w=trabDraft!==null?trabDraft:trabajadores;
    const e=embDraft!==null?embDraft:embajadores;
    const [r1,r2,r3]=await Promise.all([sg(TK,t),sg(WK,w),sg(EK,e)]);
    if(!r1||!r2||!r3){
      setGuardandoEquipo(false);
      alert("Error al guardar en Supabase. Revisa tu conexion.\ntiendas="+r1+" vendedores="+r2+" embajadores="+r3);
      return;
    }
    setTiendas(t);setTrabajadores(w);setEmbajadores(e);
    setTiendasDraft(null);setTrabDraft(null);setEmbDraft(null);
    setEquipoCambiado(false);setGuardandoEquipo(false);
    showToast("Equipo guardado correctamente");
  };

  const cambiarPassAdmin=async()=>{
    if(passForm.adminActual!==contrasenas.admin){setPassMsg(m=>({...m,admin:"Contrasena actual incorrecta."}));return;}
    if(passForm.adminNueva.length<4){setPassMsg(m=>({...m,admin:"La nueva contrasena debe tener al menos 4 caracteres."}));return;}
    if(passForm.adminNueva!==passForm.adminConfirm){setPassMsg(m=>({...m,admin:"Las contrasenas no coinciden."}));return;}
    const nc={...contrasenas,admin:passForm.adminNueva};
    await sg(CK,nc);setContrasenas(nc);setPassForm(f=>({...f,adminActual:"",adminNueva:"",adminConfirm:""}));
    setPassMsg(m=>({...m,admin:""}));showToast("Contrasena admin actualizada");
  };

  const cambiarPassEmb=async()=>{
    if(passForm.embNueva.length<4){setPassMsg(m=>({...m,emb:"La nueva contrasena debe tener al menos 4 caracteres."}));return;}
    if(passForm.embNueva!==passForm.embConfirm){setPassMsg(m=>({...m,emb:"Las contrasenas no coinciden."}));return;}
    const nc={...contrasenas,embajador:passForm.embNueva};
    await sg(CK,nc);setContrasenas(nc);setPassForm(f=>({...f,embNueva:"",embConfirm:""}));
    setPassMsg(m=>({...m,emb:""}));showToast("Contrasena embajador actualizada");
  };

  if(loading)return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>🦙</div>;

  if(vista==="inicio"){
    const mesesDisp=MESES.filter(m=>m.id==="borrador"||(!inactivasSet.has(m.id)&&pruebasMes[m.id]&&pruebasMes[m.id].preguntas?.length>0));
    return(
      <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"sans-serif",position:"relative"}}>
        {toast&&<ToastGuardado msg={toast}/>}
        <button onClick={()=>setVista("adminLogin")} style={{position:"absolute",top:20,right:20,background:C.surface,border:"1px solid "+C.border,borderRadius:10,padding:"10px 12px",cursor:"pointer",fontSize:18,color:C.textMuted}}>&#9881;</button>
        <div style={{background:C.surface,borderRadius:20,padding:36,maxWidth:460,width:"100%",boxShadow:"0 8px 32px #0008"}}>
          <div style={{fontSize:48,textAlign:"center",marginBottom:8}}>🦙</div>
          <h1 style={{textAlign:"center",color:C.text,marginBottom:24,fontSize:22}}>Evaluacion Wild Lama</h1>
          {mesesDisp.length>1&&<><label style={{fontWeight:600,display:"block",marginBottom:6,color:C.textMuted,fontSize:12}}>PRUEBA</label><select value={mesVendedor} onChange={e=>setMesVendedor(e.target.value)} style={{...ss(16)}}>{mesesDisp.map(m=><option key={m.id} value={m.id}>{m.label}</option>)}</select></>}
          <label style={{fontWeight:600,display:"block",marginBottom:6,color:C.textMuted,fontSize:12}}>TU NOMBRE</label>
          <select value={nombre} onChange={e=>{const s=trabajadores.find(w=>w.nombre===e.target.value);setNombre(e.target.value);setTienda(s?.tienda||"");}} style={{...ss(16)}}>
            <option value="">Selecciona tu nombre</option>
            {tiendas.map(t=>{const tr=trabajadores.filter(w=>w.tienda===t);if(!tr.length)return null;return <optgroup key={t} label={t}>{tr.map(w=><option key={w.nombre} value={w.nombre}>{w.nombre}</option>)}</optgroup>;})}
          </select>
          <label style={{fontWeight:600,display:"block",marginBottom:6,color:C.textMuted,fontSize:12}}>TIENDA</label>
          <div style={{padding:"10px 12px",borderRadius:8,border:"1px solid "+C.border,marginBottom:24,fontSize:14,background:C.surface2,color:tienda?C.text:C.textDim}}>{tienda||"Se completara automaticamente"}</div>
          <button onClick={()=>{
            if(!nombre||!tienda)return alert("Selecciona tu nombre.");
            if(!pruebaActiva)return alert("Esta prueba aun no tiene preguntas.");
            if(yaRindio(nombre,mesVendedor))return alert("Ya rendiste esta prueba. Solo se permite un intento.");
            setTiempo(15*60);setVista("prueba");
          }} style={bP}>Comenzar evaluacion</button>
          <button onClick={()=>setVista("embajadorLogin")} style={bEmb}>Acceso Embajador</button>
        </div>
      </div>
    );
  }

  if(vista==="adminLogin")return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"sans-serif"}}>
      <div style={{background:C.surface,borderRadius:20,padding:36,maxWidth:400,width:"100%"}}>
        <div style={{fontSize:32,textAlign:"center",marginBottom:8}}>&#9881;</div>
        <h2 style={{textAlign:"center",color:C.text,marginBottom:20}}>Panel Administrador</h2>
        <input type="password" value={adminPass} onChange={e=>{setAdminPass(e.target.value);setAdminError(false);}} placeholder="Contrasena" style={{...ss(8),border:"1px solid "+(adminError?C.error:C.border)}}/>
        {adminError&&<p style={{color:C.error,fontSize:13,marginBottom:8}}>Contrasena incorrecta.</p>}
        <button onClick={()=>abrirAdmin(adminPass)} style={bP}>Entrar</button>
        <button onClick={()=>setVista("inicio")} style={bEmb}>Volver</button>
      </div>
    </div>
  );

  if(vista==="embajadorLogin")return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"sans-serif"}}>
      <div style={{background:C.surface,borderRadius:20,padding:36,maxWidth:400,width:"100%"}}>
        <div style={{fontSize:32,textAlign:"center",marginBottom:8}}>&#11088;</div>
        <h2 style={{textAlign:"center",color:C.text,marginBottom:4}}>Acceso Embajador</h2>
        <p style={{textAlign:"center",color:C.textMuted,fontSize:13,marginBottom:20}}>Solo para embajadores de tienda</p>
        <label style={{fontWeight:600,display:"block",marginBottom:6,color:C.textMuted,fontSize:12}}>TU NOMBRE</label>
        <select value={embNombre} onChange={e=>{const s=embajadores.find(w=>w.nombre===e.target.value);setEmbNombre(e.target.value);setEmbTienda(s?.tienda||"");}} style={{...ss(12)}}>
          <option value="">Selecciona tu nombre</option>
          {tiendas.map(t=>{const em=embajadores.filter(w=>w.tienda===t);if(!em.length)return null;return <optgroup key={t} label={t}>{em.map(w=><option key={w.nombre} value={w.nombre}>{w.nombre}</option>)}</optgroup>;})}
        </select>
        <input type="password" value={embPass} onChange={e=>{setEmbPass(e.target.value);setEmbError(false);}} placeholder="Contrasena" style={{...ss(8),border:"1px solid "+(embError?C.error:C.border)}}/>
        {embError&&<p style={{color:C.error,fontSize:13,marginBottom:8}}>Contrasena incorrecta.</p>}
        <button onClick={()=>abrirEmb(embPass)} style={bP}>Entrar</button>
        <button onClick={()=>setVista("inicio")} style={bEmb}>Volver</button>
      </div>
    </div>
  );

  if(vista==="prueba"){
    const secciones=[...new Set(pruebaActiva.preguntas.map(p=>p.seccion))];
    return(
      <div style={{minHeight:"100vh",background:C.bg,padding:"20px 16px",fontFamily:"sans-serif"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{background:C.surface,borderRadius:12,padding:"14px 20px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,position:"sticky",top:12,zIndex:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:24}}>🦙</span>
              <div><div style={{fontWeight:700,fontSize:15,color:C.text}}>Wild Lama - {pruebaActiva.version}</div><div style={{fontSize:12,color:C.textMuted}}>{nombre} - {tienda}</div></div>
            </div>
            <div style={{background:tiempo<=60?C.error:tiempo<=180?C.warning:C.primaryLight,borderRadius:8,padding:"8px 16px",fontWeight:800,fontSize:18,color:tiempo<=180?"#fff":C.primary}}>&#9201; {fmt(tiempo)}</div>
          </div>
          {secciones.map(sec=>(
            <div key={sec} style={{background:C.surface,borderRadius:14,padding:24,marginBottom:14}}>
              <h2 style={{fontSize:11,fontWeight:700,color:C.primary,textTransform:"uppercase",letterSpacing:2,marginBottom:18,marginTop:0}}>{sec}</h2>
              {pruebaActiva.preguntas.filter(p=>p.seccion===sec).map((p,i)=>(
                <div key={p.id} style={{marginBottom:22}}>
                  <p style={{fontWeight:600,marginBottom:10,color:C.text,lineHeight:1.5,fontSize:14}}><span style={{color:C.textDim,marginRight:6}}>{i+1}.</span>{p.texto}</p>
                  {p.tipo==="vof"&&<div style={{display:"flex",gap:8}}>{["Verdadero","Falso"].map(op=><button key={op} onClick={()=>setRespuestas(r=>({...r,[p.id]:op}))} style={{flex:1,padding:"10px 0",borderRadius:8,border:"2px solid "+(respuestas[p.id]===op?C.primary:C.border),background:respuestas[p.id]===op?C.primaryLight:C.surface2,color:respuestas[p.id]===op?C.primary:C.textMuted,fontWeight:600,cursor:"pointer",fontSize:14}}>{op}</button>)}</div>}
                  {p.tipo==="alternativas"&&<div style={{display:"flex",flexDirection:"column",gap:7}}>{(p.opciones||[]).map(op=><button key={op} onClick={()=>setRespuestas(r=>({...r,[p.id]:op}))} style={{textAlign:"left",padding:"10px 14px",borderRadius:8,border:"2px solid "+(respuestas[p.id]===op?C.primary:C.border),background:respuestas[p.id]===op?C.primaryLight:C.surface2,color:respuestas[p.id]===op?C.primary:C.textMuted,cursor:"pointer",fontSize:13,lineHeight:1.4}}>{op}</button>)}</div>}
                  {p.tipo==="desarrollo"&&<textarea value={respuestas[p.id]||""} onChange={e=>setRespuestas(r=>({...r,[p.id]:e.target.value}))} placeholder="Escribe tu respuesta aqui..." rows={4} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid "+C.border,fontSize:13,resize:"vertical",boxSizing:"border-box",background:C.surface2,color:C.text}}/>}
                </div>
              ))}
            </div>
          ))}
          <div style={{background:C.surface,borderRadius:14,padding:24,marginBottom:14}}>
            <p style={{fontWeight:700,color:C.text,marginBottom:4,fontSize:14}}>Que tan dificil te parecio? 🦙</p>
            <p style={{color:C.textMuted,marginBottom:12,fontSize:12}}>1 = muy dificil - 5 = muy sencilla</p>
            <div style={{display:"flex",gap:8,marginBottom:16}}>{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setDificultad(n)} style={{flex:1,padding:"11px 0",borderRadius:8,border:"2px solid "+(dificultad===n?C.primary:C.border),background:dificultad===n?C.primaryLight:C.surface2,color:dificultad===n?C.primary:C.textMuted,fontWeight:700,cursor:"pointer",fontSize:16}}>{n}</button>)}</div>
            <textarea value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="Tienes dudas sobre algun protocolo?" rows={2} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid "+C.border,fontSize:13,resize:"vertical",boxSizing:"border-box",background:C.surface2,color:C.text}}/>
          </div>
          <button onClick={handleSubmit} disabled={guardando} style={{...bP,padding:"16px 0",fontSize:16,marginBottom:40}}>{guardando?"Guardando...":"Enviar evaluacion 🦙"}</button>
        </div>
      </div>
    );
  }

  if(vista==="resultado")return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"sans-serif"}}>
      <div style={{background:C.surface,borderRadius:20,padding:36,maxWidth:440,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:56,marginBottom:8}}>{puntaje>=8?"🎉":puntaje>=6?"💪":"📚"}</div>
        <h2 style={{color:C.text,marginBottom:4}}>Evaluacion enviada!</h2>
        <p style={{color:C.textMuted,marginBottom:4}}>Gracias, {nombre}</p>
        <p style={{color:C.textDim,fontSize:13,marginBottom:20}}>{pruebaActiva?.version}</p>
        <div style={{background:C.surface2,borderRadius:12,padding:"20px 0",marginBottom:14}}>
          <div style={{fontSize:52,fontWeight:800,color:C.primary}}>{puntaje}<span style={{fontSize:22,color:C.textDim}}>/{totC()}</span></div>
          <div style={{color:C.textMuted,marginTop:6,fontSize:14}}>{puntaje>=8?"Excelente resultado! 🦙":puntaje>=6?"Buen trabajo, sigue repasando.":"Te recomendamos repasar el Playbook."}</div>
        </div>
        {guardadoOk===false&&<div style={{background:C.errorBg,border:"1px solid "+C.error,borderRadius:10,padding:"12px 16px",marginBottom:14}}>
          <div style={{fontWeight:700,color:C.error,fontSize:14,marginBottom:4}}>⚠️ Error al guardar</div>
          <div style={{fontSize:13,color:C.text,lineHeight:1.5}}>Tu resultado no pudo guardarse por un problema de conexion. Avisa a tu embajador o a SAC para que lo registren manualmente.</div>
        </div>}
        {guardadoOk===true&&<div style={{background:C.successBg,border:"1px solid #4caf50",borderRadius:10,padding:"10px 16px",marginBottom:14,fontSize:13,color:"#4caf50",fontWeight:600}}>✓ Resultado guardado correctamente</div>}
        <p style={{color:C.textMuted,fontSize:13,marginBottom:20}}>Tu embajador te dara feedback pronto. 🦙</p>
        <button onClick={()=>{setVista("inicio");setRespuestas({});setNombre("");setTienda("");setDificultad(null);setComentario("");setGuardadoOk(null);}} style={bP}>Volver al inicio</button>
      </div>
    </div>
  );

  if(vista==="embajador"){
    const restienda=Object.entries(resultados).flatMap(([mesId,res])=>safeArr(res).filter(r=>r.tienda===embTienda).map(r=>({...r,mesId})));
    const versionesEmb=["Todas",...new Set(restienda.map(r=>r.version))];
    const resFilt=filtroVT==="Todas"?restienda:restienda.filter(r=>r.version===filtroVT);
    return(
      <div style={{minHeight:"100vh",background:C.bg,padding:"24px 16px",fontFamily:"sans-serif"}}>
        {toast&&<ToastGuardado msg={toast}/>}
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <div><h1 style={{margin:0,color:C.text}}>&#11088; {embTienda}</h1><p style={{margin:0,color:C.textMuted,fontSize:14}}>Hola, {embNombre}</p></div>
            <button onClick={()=>setVista("inicio")} style={{background:C.surface,border:"1px solid "+C.border,borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13,color:C.textMuted}}>Salir</button>
          </div>
          <div style={{background:C.surface,borderRadius:10,padding:14,marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <label style={{fontSize:13,fontWeight:600,color:C.textMuted}}>Prueba:</label>
            <select value={filtroVT} onChange={e=>setFiltroVT(e.target.value)} style={{padding:"6px 10px",borderRadius:6,border:"1px solid "+C.border,fontSize:13,background:C.surface2,color:C.text}}>
              {versionesEmb.map(v=><option key={v}>{v}</option>)}
            </select>
            <span style={{fontSize:12,color:C.textDim}}>{resFilt.length} evaluaciones</span>
          </div>
          {resFilt.length===0
            ?<div style={{background:C.surface,borderRadius:12,padding:32,textAlign:"center",color:C.textDim}}>No hay evaluaciones aun para tu tienda.</div>
            :resFilt.map((r,i)=>{
              const key=mkKey(r.nombre,r.version);
              const fb=feedbacks[key];const rf=refuerzos[key];const ab=fbAbierto===key;
              const mesIdDeEsta=MESES.find(m=>m.label===r.version)?.id;const pruebaDeEsta=(()=>{if(r.version==="Borrador")return prueba;if(mesIdDeEsta&&pruebasMes[mesIdDeEsta])return pruebasMes[mesIdDeEsta];return Object.values(pruebasMes).find(p=>p&&p.version===r.version)||null;})();
              const errores=pruebaDeEsta?pruebaDeEsta.preguntas.filter(p=>p.tipo!=="desarrollo"&&r.respuestas&&r.respuestas[p.id]!==p.correcta):[];
              return(
                <div key={i} style={{background:C.surface,borderRadius:12,padding:18,marginBottom:10,border:"1px solid "+C.border}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10}}>
                    <div><div style={{fontWeight:700,fontSize:15,color:C.text}}>{r.nombre}</div><div style={{fontSize:12,color:C.textMuted}}>{r.version} - {r.fecha}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{background:pBg(r.puntaje),borderRadius:8,padding:"5px 12px",fontWeight:800,fontSize:16,color:pColor(r.puntaje)}}>{r.puntaje}/{r.total}</div>
                      {fb&&<span style={{fontSize:11,background:C.successBg,color:"#4caf50",borderRadius:6,padding:"2px 7px"}}>ok Feedback</span>}
                    </div>
                  </div>
                  {errores.length>0&&<div style={{marginBottom:10}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.error,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Respuestas incorrectas</div>
                    {errores.map((p,j)=>(
                      <div key={j} style={{background:C.surface2,borderRadius:8,padding:"10px 12px",marginBottom:6,border:"1px solid "+C.border}}>
                        <div style={{fontSize:12,color:C.text,marginBottom:8,lineHeight:1.5,fontWeight:600}}>{pruebaDeEsta.preguntas.indexOf(p)+1}. {p.texto}</div>
                        <div style={{display:"flex",flexDirection:"column",gap:5}}>
                          <div style={{display:"flex",alignItems:"flex-start",gap:8,background:C.errorBg,borderRadius:6,padding:"6px 10px"}}>
                            <span style={{fontSize:12,fontWeight:800,color:C.error,flexShrink:0}}>X</span>
                            <div><div style={{fontSize:10,color:C.error,fontWeight:700,marginBottom:2}}>RESPONDIO</div><div style={{fontSize:12,color:C.text}}>{r.respuestas[p.id]||"Sin respuesta"}</div></div>
                          </div>
                          <div style={{display:"flex",alignItems:"flex-start",gap:8,background:C.successBg,borderRadius:6,padding:"6px 10px"}}>
                            <span style={{fontSize:12,fontWeight:800,color:"#4caf50",flexShrink:0}}>ok</span>
                            <div><div style={{fontSize:10,color:"#4caf50",fontWeight:700,marginBottom:2}}>CORRECTA</div><div style={{fontSize:12,color:C.text}}>{p.correcta}</div></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>}
                  {errores.length===0&&pruebaDeEsta&&<div style={{fontSize:12,color:"#4caf50",background:C.successBg,borderRadius:7,padding:"6px 10px",marginBottom:10}}>Sin errores en preguntas objetivas</div>}
                  {r.desarrollo&&<div style={{background:C.surface2,borderRadius:8,padding:10,marginBottom:10}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.primary,marginBottom:4}}>Respuesta desarrollo</div>
                    <div style={{fontSize:12,color:C.text,lineHeight:1.5,marginBottom:pruebaDeEsta?.respuestaModelo?10:0}}>{r.desarrollo}</div>
                    {pruebaDeEsta?.respuestaModelo&&<div style={{borderTop:"1px solid "+C.border,paddingTop:8,marginTop:4}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#4caf50",marginBottom:4}}>Respuesta modelo</div>
                      <div style={{fontSize:12,color:C.text,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{pruebaDeEsta.respuestaModelo}</div>
                    </div>}
                  </div>}
                  {!r.desarrollo&&pruebaDeEsta?.respuestaModelo&&<div style={{background:C.surface2,borderRadius:8,padding:10,marginBottom:10}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#4caf50",marginBottom:4}}>Respuesta modelo</div>
                    <div style={{fontSize:12,color:C.text,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{pruebaDeEsta.respuestaModelo}</div>
                  </div>}
                  {rf&&<div style={{background:C.warningBg,borderRadius:8,padding:10,marginBottom:10}}><div style={{fontWeight:600,fontSize:12,color:C.warning,marginBottom:4}}>Puntos a reforzar</div><div style={{fontSize:13,color:C.text,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{rf}</div></div>}
                  {fb&&!ab&&<div style={{background:C.surface2,borderRadius:8,padding:10,marginBottom:8}}>
                    <div style={{fontSize:11,color:C.textMuted,marginBottom:5}}>{fb.embajador} - {fb.fecha}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:fb.comentario?5:0}}>
                      {[["teorico","Teorico"],["roleplay","Role-Play"],["notion","Notion"],["aplicacion","Casos reales"]].map(([k,l])=>(
                        <span key={k} style={{fontSize:11,padding:"2px 7px",borderRadius:5,background:fb[k]?C.successBg:C.errorBg,color:fb[k]?"#4caf50":C.error}}>{fb[k]?"ok":"-"} {l}</span>
                      ))}
                    </div>
                    {fb.comentario&&<div style={{fontSize:12,color:C.textMuted}}>&#128172; {fb.comentario}</div>}
                  </div>}
                  <button onClick={()=>{setFbAbierto(ab?null:key);setFbForm(fb?{...fb}:{teorico:false,roleplay:false,notion:false,aplicacion:false,comentario:""});}} style={{background:ab?C.surface2:C.primary,color:ab?C.textMuted:"#fff",border:"none",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600}}>
                    {ab?"Cancelar":fb?"Editar feedback":"Completar feedback"}
                  </button>
                  {ab&&<div style={{background:C.surface2,borderRadius:10,padding:14,marginTop:10}}>
                    {[["teorico","Teorico"],["roleplay","Role-Play"],["notion","Notion / Asistente Virtual"],["aplicacion","Aplicacion en casos reales"]].map(([k,l])=>(
                      <label key={k} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer",fontSize:13,color:fbForm[k]?"#4caf50":C.textMuted}}>
                        <input type="checkbox" checked={fbForm[k]} onChange={e=>setFbForm(f=>({...f,[k]:e.target.checked}))} style={{width:16,height:16,cursor:"pointer",accentColor:C.primary}}/>{l}
                      </label>
                    ))}
                    <textarea value={fbForm.comentario} onChange={e=>setFbForm(f=>({...f,comentario:e.target.value}))} placeholder="Comentarios..." rows={2} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid "+C.border,fontSize:12,resize:"vertical",boxSizing:"border-box",marginBottom:10,background:C.surface,color:C.text}}/>
                    <button onClick={()=>guardarFb(r.nombre,r.version)} disabled={guardandoFb} style={{...bP,marginBottom:0,padding:"10px 0",fontSize:13}}>{guardandoFb?"Guardando...":"Guardar feedback"}</button>
                  </div>}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

  if(vista==="admin"){
    const mesLabel=MESES.find(m=>m.id===mesActivo)?.label||"";
    const mesRes=mesArr(mesActivo).filter(r=>filtroTienda==="Todas"||r.tienda===filtroTienda);
    const mesPrueba=mesActivo==="borrador"?prueba:(pruebasMes[mesActivo]||null);
    const stats=getStats(mesRes,mesPrueba);
    const SBBtn=({tab,sec,label})=>(<button onClick={()=>{setAdminSec(sec);setAdminTab(tab);if(tab==="menu"||tab==="global"||tab==="contrasenas")setMesActivo(null);}} style={{textAlign:"left",padding:"8px 12px",borderRadius:8,border:"none",background:adminTab===tab&&adminSec===sec?C.primaryLight:"transparent",color:adminTab===tab&&adminSec===sec?C.primary:C.textMuted,cursor:"pointer",fontSize:13,marginBottom:2,width:"100%"}}>{label}</button>);
    return(
      <div style={{minHeight:"100vh",background:C.bg,fontFamily:"sans-serif",display:"flex"}}>
        {toast&&<ToastGuardado msg={toast}/>}
        {modalCierre&&<div style={{position:"fixed",inset:0,background:"#000a",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:C.surface,borderRadius:16,padding:28,maxWidth:520,width:"100%",maxHeight:"80vh",overflowY:"auto",boxShadow:"0 8px 32px #000a"}}>
            <h3 style={{color:C.text,marginTop:0,marginBottom:6}}>Cerrar prueba</h3>
            <p style={{color:C.textMuted,fontSize:13,marginBottom:20}}>Las siguientes tiendas tienen menos de 2 evaluaciones. Selecciona los vendedores que no se presentaron para registrarlos con nota 0.</p>
            {modalCierre.tiendasIncompletas.map(t=>{
              const yaRindieron=modalCierre.tiendasConRes[t]||[];
              const faltantes=2-yaRindieron.length;
              const trabDeEsta=trabajadores.filter(w=>w.tienda===t&&!yaRindieron.includes(w.nombre));
              const seleccionados=selNoPresentados[t]||[];
              return(
                <div key={t} style={{background:C.surface2,borderRadius:10,padding:14,marginBottom:12}}>
                  <div style={{fontWeight:700,color:C.text,fontSize:13,marginBottom:4}}>{t}</div>
                  <div style={{fontSize:11,color:C.textMuted,marginBottom:10}}>Rindieron {yaRindieron.length}/2 — falta {faltantes} vendedor{faltantes>1?"es":""}</div>
                  {Array.from({length:faltantes}).map((_,idx)=>(
                    <div key={idx} style={{marginBottom:8}}>
                      <select value={seleccionados[idx]||""} onChange={e=>{const n=[...seleccionados];n[idx]=e.target.value;setSelNoPresentados(s=>({...s,[t]:n}));}} style={{width:"100%",padding:"8px 10px",borderRadius:7,border:"1px solid "+C.border,fontSize:13,background:C.surface,color:C.text}}>
                        <option value="">Seleccionar vendedor {idx+1}</option>
                        {trabDeEsta.filter(w=>!seleccionados.includes(w.nombre)||seleccionados[idx]===w.nombre).map(w=><option key={w.nombre} value={w.nombre}>{w.nombre}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              );
            })}
            <div style={{display:"flex",gap:10,marginTop:16}}>
              <button onClick={confirmarCierre} style={{flex:1,background:"#1a5c2a",color:"#fff",border:"none",borderRadius:10,padding:"12px 0",fontWeight:700,fontSize:14,cursor:"pointer"}}>Confirmar y cerrar prueba</button>
              <button onClick={async()=>{const lista=mesesConfig.inactivas||[];const nc={...mesesConfig,inactivas:[...lista,modalCierre.mesId]};await sg(MCK,nc);setMesesConfig(nc);setModalCierre(null);showToast("Prueba marcada como inactiva");}} style={{flex:1,background:C.surface2,color:C.textMuted,border:"1px solid "+C.border,borderRadius:10,padding:"12px 0",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cerrar sin registrar</button>
            </div>
          </div>
        </div>}
        <div style={{width:220,background:C.surface,borderRight:"1px solid "+C.border,padding:"20px 12px",display:"flex",flexDirection:"column",gap:2,flexShrink:0}}>
          <div style={{fontSize:22,marginBottom:2}}>🦙</div>
          <div style={{fontWeight:700,color:C.text,fontSize:14,marginBottom:2}}>Panel Admin</div>
          <div style={{fontSize:11,color:C.textDim,marginBottom:20}}>{allRes().length} evaluaciones totales</div>
          <div style={{fontSize:10,fontWeight:700,color:C.primary,textTransform:"uppercase",letterSpacing:1.5,marginBottom:6}}>Pruebas</div>
          <SBBtn tab="menu" sec="pruebas" label="Menu de pruebas"/>
          <SBBtn tab="global" sec="pruebas" label="Informe Global"/>
          <div style={{fontSize:10,fontWeight:700,color:C.primary,textTransform:"uppercase",letterSpacing:1.5,marginBottom:6,marginTop:16}}>Equipo</div>
          <SBBtn tab="tiendas" sec="equipo" label="Tiendas y vendedores"/>
          <SBBtn tab="embajadores" sec="equipo" label="Embajadores"/>
          <div style={{fontSize:10,fontWeight:700,color:C.primary,textTransform:"uppercase",letterSpacing:1.5,marginBottom:6,marginTop:16}}>Configuracion</div>
          <SBBtn tab="contrasenas" sec="config" label="Contrasenas"/>
          <div style={{flex:1}}/>
          <button onClick={()=>setVista("inicio")} style={{textAlign:"left",padding:"8px 12px",borderRadius:8,border:"none",background:"transparent",color:C.textDim,cursor:"pointer",fontSize:12}}>Salir</button>
        </div>
        <div style={{flex:1,padding:"28px 24px",overflowY:"auto"}}>

          {adminSec==="config"&&adminTab==="contrasenas"&&(
            <div>
              <h2 style={{color:C.text,marginTop:0,marginBottom:20}}>Cambiar contrasenas</h2>
              <div style={{background:C.surface,borderRadius:14,padding:22,marginBottom:16,border:"1px solid "+C.border}}>
                <h3 style={{color:C.text,marginTop:0,fontSize:14,marginBottom:16}}>Contrasena Admin</h3>
                <input type="password" value={passForm.adminActual} onChange={e=>setPassForm(f=>({...f,adminActual:e.target.value}))} placeholder="Contrasena actual" style={{...ss(10)}}/>
                <input type="password" value={passForm.adminNueva} onChange={e=>setPassForm(f=>({...f,adminNueva:e.target.value}))} placeholder="Nueva contrasena" style={{...ss(10)}}/>
                <input type="password" value={passForm.adminConfirm} onChange={e=>setPassForm(f=>({...f,adminConfirm:e.target.value}))} placeholder="Confirmar nueva contrasena" style={{...ss(12)}}/>
                {passMsg.admin&&<p style={{color:C.error,fontSize:13,marginBottom:10}}>{passMsg.admin}</p>}
                <button onClick={cambiarPassAdmin} style={{...bP,marginBottom:0}}>Actualizar contrasena admin</button>
              </div>
              <div style={{background:C.surface,borderRadius:14,padding:22,border:"1px solid "+C.border}}>
                <h3 style={{color:C.text,marginTop:0,fontSize:14,marginBottom:16}}>Contrasena Embajadores</h3>
                <input type="password" value={passForm.embNueva} onChange={e=>setPassForm(f=>({...f,embNueva:e.target.value}))} placeholder="Nueva contrasena" style={{...ss(10)}}/>
                <input type="password" value={passForm.embConfirm} onChange={e=>setPassForm(f=>({...f,embConfirm:e.target.value}))} placeholder="Confirmar nueva contrasena" style={{...ss(12)}}/>
                {passMsg.emb&&<p style={{color:C.error,fontSize:13,marginBottom:10}}>{passMsg.emb}</p>}
                <button onClick={cambiarPassEmb} style={{...bP,marginBottom:0}}>Actualizar contrasena embajadores</button>
              </div>
            </div>
          )}

          {adminSec==="pruebas"&&adminTab==="menu"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
                <h2 style={{color:C.text,margin:0}}>Pruebas mensuales</h2>
                <button onClick={agregarAnio} style={{background:C.primaryLight,color:C.primary,border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>+ Agregar año {Math.max(...anios)+1}</button>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:20}}>
                  <div style={{background:C.surface,borderRadius:12,padding:18,border:"1px solid "+C.border}}>
                    <div style={{fontSize:11,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Borrador</div>
                    <div style={{fontWeight:700,color:C.text,fontSize:16,marginBottom:6,cursor:"pointer"}} onClick={()=>{setMesActivo("borrador");setAdminTab("verMes");setMesSubTab("inf");}}>Prueba de ensayo</div>
                    <div style={{fontSize:12,color:C.textDim,marginBottom:10}}>{mesArr("borrador").length} evaluaciones</div>
                    <button onClick={async(e)=>{
                      e.stopPropagation();
                      const nombres=[
                        {n:"Jesus Guillen Jerez",t:"Vitacura"},{n:"Valentina Saa Pino",t:"Vitacura"},
                        {n:"Florencia Toro Junginger",t:"Vitacura"},{n:"Talia Godoy Jofre",t:"Vitacura"},
                        {n:"Cristell Santillan Nestarez",t:"Vitacura"},{n:"Fabiola Quispe Toribio",t:"Vitacura"},
                        {n:"Claudia Vargas Alfaro",t:"Antofagasta"},{n:"Ingrid Becerra",t:"Antofagasta"},
                        {n:"Oscar Carvajal",t:"Marina"},{n:"Vanessa Munoz",t:"Marina"},
                      ];
                      const pregs=prueba.preguntas.filter(p=>p.tipo!=="desarrollo");
                      const ejemplos=nombres.map((v,i)=>{
                        const resp={};
                        pregs.forEach((p)=>{
                          const acierta=Math.random()>0.35;
                          if(p.tipo==="vof"){resp[p.id]=acierta?p.correcta:(p.correcta==="Verdadero"?"Falso":"Verdadero");}
                          else{resp[p.id]=acierta?p.correcta:(p.opciones.find(o=>o!==p.correcta)||p.correcta);}
                        });
                        const pt=pregs.filter(p=>resp[p.id]===p.correcta).length;
                        return{nombre:v.n,tienda:v.t,version:"Borrador",fecha:"01/05/2026 10:"+String(i*5+10).padStart(2,"0"),puntaje:pt,total:pregs.length,respuestas:resp,desarrollo:"Es una empresa que cumple con estandares sociales y ambientales.",dificultad:3,comentario:"",tiempoAgotado:false};
                      });
                      const nr={...resultados,borrador:ejemplos};
                      setResultados(nr);await sg(SK,nr);
                      setMesActivo("borrador");setAdminTab("verMes");setMesSubTab("inf");
                      showToast("Datos de ejemplo cargados");
                    }} style={{background:C.primaryLight,color:C.primary,border:"none",borderRadius:7,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:600,width:"100%"}}>
                      Cargar datos de ejemplo
                    </button>
                  </div>
                </div>
                {anios.map(anio=>(
                  <div key={anio} style={{marginBottom:24}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.primary,textTransform:"uppercase",letterSpacing:2,marginBottom:10,paddingBottom:6,borderBottom:"1px solid "+C.border}}>{anio}</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
                      {MESES.filter(m=>m.anio===anio).map(m=>{
                        const res=mesArr(m.id);const prb=pruebasMes[m.id];
                        const pts=res.map(r=>r.puntaje);
                        const prom=pts.length?(pts.reduce((a,b)=>a+b,0)/pts.length).toFixed(1):null;
                        const inactiva=inactivasSet.has(m.id);
                        return(
                          <div key={m.id} style={{background:C.surface,borderRadius:12,padding:16,border:"1px solid "+(inactiva?"#555":prb?C.primary:C.border),position:"relative",opacity:inactiva?0.7:1}}>
                            <div style={{position:"absolute",top:8,right:8,display:"flex",gap:4}}>
                              {inactiva&&<span style={{fontSize:9,background:"#555",color:"#aaa",borderRadius:4,padding:"2px 5px",fontWeight:700}}>INACTIVA</span>}
                              {!inactiva&&prb&&<span style={{fontSize:9,background:C.primaryLight,color:C.primary,borderRadius:4,padding:"2px 5px"}}>Activa</span>}
                            </div>
                            <div style={{cursor:"pointer"}} onClick={()=>{setMesActivo(m.id);setAdminTab("verMes");setMesSubTab("inf");}}>
                              <div style={{fontWeight:700,color:inactiva?C.textMuted:C.text,fontSize:14,marginBottom:4,marginTop:4}}>{m.label}</div>
                              <div style={{fontSize:11,color:C.textDim}}>{res.length} evaluaciones</div>
                              {prom&&<div style={{fontSize:12,color:C.primary,fontWeight:700,marginTop:3}}>Prom: {prom}/10</div>}
                              {!prb&&<div style={{fontSize:11,color:C.textDim,marginTop:3}}>Sin configurar</div>}
                            </div>
                            <button onClick={e=>{e.stopPropagation();toggleInactiva(m.id);}} style={{marginTop:8,width:"100%",background:inactiva?"#1a3a1a":"#2e2e2e",color:inactiva?"#4caf50":"#999",border:"none",borderRadius:6,padding:"5px 0",fontSize:11,cursor:"pointer",fontWeight:600}}>
                              {inactiva?"Reactivar":"Marcar inactiva"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminSec==="pruebas"&&adminTab==="verMes"&&mesActivo&&(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
                <button onClick={()=>{setAdminTab("menu");setMesActivo(null);}} style={{background:C.surface,border:"1px solid "+C.border,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:13,color:C.textMuted}}>Volver</button>
                <h2 style={{color:C.text,margin:0}}>{mesLabel}</h2>
                <button onClick={()=>descargarExcel(mesLabel,mesRes,mesPrueba,refuerzos,feedbacks)} style={{background:"#1a7a3a",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:13,fontWeight:600}}>Descargar Excel</button>
                {mesActivo!=="borrador"&&<button onClick={()=>toggleInactiva(mesActivo)} style={{background:inactivasSet.has(mesActivo)?"#1a3a1a":"#2e2e2e",color:inactivasSet.has(mesActivo)?"#4caf50":"#999",border:"none",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:13,fontWeight:600}}>{inactivasSet.has(mesActivo)?"Reactivar":"Marcar inactiva"}</button>}
                <button onClick={()=>{setEditPrueba(mesPrueba?JSON.parse(JSON.stringify(mesPrueba)):{...PRUEBA_DEFAULT,version:mesLabel,preguntas:[]});setAdminTab("editarMes");}} style={{background:C.primaryLight,border:"none",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:13,color:C.primary,fontWeight:600,marginLeft:"auto"}}>{mesPrueba?"Editar":"Configurar"}</button>
              </div>
              <div style={{display:"flex",gap:6,marginBottom:20}}>
                {[["inf","Informe"],["res","Resultados"],["ref","Puntos a reforzar"]].map(([t,l])=>(
                  <button key={t} onClick={()=>setMesSubTab(t)} style={{padding:"8px 16px",borderRadius:8,border:"none",background:mesSubTab===t?C.primaryLight:"transparent",color:mesSubTab===t?C.primary:C.textMuted,cursor:"pointer",fontSize:13,fontWeight:600}}>{l}</button>
                ))}
              </div>
              <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:C.textMuted}}>TIENDA</label>
                <select value={filtroTienda} onChange={e=>setFiltroTienda(e.target.value)} style={{padding:"6px 10px",borderRadius:6,border:"1px solid "+C.border,fontSize:13,background:C.surface2,color:C.text}}>
                  <option>Todas</option>{tiendas.map(t=><option key={t}>{t}</option>)}
                </select>
                <span style={{fontSize:12,color:C.textDim}}>{mesRes.length} evaluaciones</span>
              </div>

              {mesSubTab==="inf"&&(mesRes.length===0?<div style={{background:C.surface,borderRadius:12,padding:32,textAlign:"center",color:C.textDim}}>No hay evaluaciones aun.</div>:<>
                <StatCards res={mesRes}/>
                <div style={{background:C.surface,borderRadius:12,padding:20,marginBottom:14,border:"1px solid "+C.border}}>
                  <h3 style={{marginTop:0,color:C.text,fontSize:13}}>Distribucion de puntajes</h3>
                  <DistChart puntajes={mesRes.map(r=>r.puntaje)} total={mesRes[0]?.total||10}/>
                </div>
                {stats&&<>
                  <div style={{background:C.surface,borderRadius:12,padding:20,marginBottom:14,border:"1px solid "+C.border}}>
                    <h3 style={{marginTop:0,color:C.text,fontSize:13}}>Preguntas con mas errores</h3>
                    {stats.masErrores.map(p=>(
                      <div key={p.id} style={{borderLeft:"3px solid "+(Number(p.pct)<50?C.error:C.warning),paddingLeft:10,marginBottom:14}}>
                        <p style={{fontWeight:600,fontSize:12,color:C.text,margin:"0 0 3px"}}>{p.texto.substring(0,90)}...</p>
                        <p style={{fontSize:11,color:C.textMuted,margin:"0 0 6px"}}>{p.correctas}/{p.total} correctas ({p.pct}%)</p>
                        <BarChart data={p.dist} max={p.total}/>
                      </div>
                    ))}
                  </div>
                  <div style={{background:C.surface,borderRadius:12,padding:20,marginBottom:14,border:"1px solid "+C.border}}>
                    <h3 style={{marginTop:0,color:C.text,fontSize:13}}>Detalle por pregunta</h3>
                    {stats.statsPQ.map((p,i)=>(
                      <div key={p.id} style={{marginBottom:18,paddingBottom:18,borderBottom:i<stats.statsPQ.length-1?"1px solid "+C.border:"none"}}>
                        <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:6}}>
                          <p style={{fontWeight:600,fontSize:12,color:C.text,margin:0,lineHeight:1.5,flex:1}}>{i+1}. {p.texto}</p>
                          <div style={{background:Number(p.pct)>=80?C.successBg:Number(p.pct)>=60?C.warningBg:C.errorBg,borderRadius:7,padding:"3px 9px",fontWeight:700,fontSize:12,color:Number(p.pct)>=80?"#4caf50":Number(p.pct)>=60?C.warning:C.error,flexShrink:0}}>{p.correctas}/{p.total}</div>
                        </div>
                        <BarChart data={p.dist} max={p.total}/>
                      </div>
                    ))}
                  </div>
                  <div style={{background:C.surface,borderRadius:12,padding:20,border:"1px solid "+C.border}}>
                    <h3 style={{marginTop:0,color:C.text,fontSize:13}}>Respuestas de desarrollo</h3>
                    {mesRes.filter(r=>r.desarrollo).map((r,i)=>(
                      <div key={i} style={{background:C.surface2,borderRadius:8,padding:10,marginBottom:8}}>
                        <div style={{fontSize:11,color:C.textMuted,marginBottom:3}}>{r.nombre} - {r.tienda} - {r.fecha}</div>
                        <div style={{fontSize:12,color:C.text,lineHeight:1.5}}>{r.desarrollo}</div>
                      </div>
                    ))}
                  </div>
                </>}
              </>)}

              {mesSubTab==="res"&&(mesRes.length===0?<div style={{background:C.surface,borderRadius:12,padding:32,textAlign:"center",color:C.textDim}}>No hay evaluaciones.</div>:mesRes.map((r,i)=>(
                <div key={i} style={{background:C.surface,borderRadius:12,padding:16,marginBottom:8,border:"1px solid "+C.border}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexWrap:"wrap"}}>
                    <div><div style={{fontWeight:700,fontSize:14,color:C.text}}>{r.nombre}</div><div style={{fontSize:12,color:C.textMuted}}>{r.tienda} - {r.fecha}</div></div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <div style={{background:pBg(r.puntaje),borderRadius:8,padding:"5px 12px",fontWeight:800,fontSize:16,color:pColor(r.puntaje)}}>{r.puntaje}/{r.total}</div>
                      <button onClick={async()=>{if(!confirm("Eliminar resultado de "+r.nombre+"?"))return;
                      // Delete from new individual rows
                      try{
                        const rows=await fetch(SUPABASE_URL+"/rest/v1/wl_data?select=key,value",{headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY}});
                        const data=await rows.json();
                        const match=data.filter(row=>row.key&&row.key.startsWith("wl_res_"+mesActivo)).find(row=>{try{const v=JSON.parse(row.value);return v.nombre===r.nombre&&v.fecha===r.fecha;}catch{return false;}});
                        if(match){await fetch(SUPABASE_URL+"/rest/v1/wl_data?key=eq."+encodeURIComponent(match.key),{method:"DELETE",headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY}});}
                      }catch{}
                      setResultados(prev=>({...prev,[mesActivo]:safeArr(prev[mesActivo]).filter((_,j)=>j!==i)}));
                      showToast("Resultado eliminado");}} style={{background:C.errorBg,border:"none",borderRadius:7,padding:"5px 9px",color:C.error,cursor:"pointer",fontSize:12}}>X</button>
                    </div>
                  </div>
                  {r.desarrollo&&<div style={{marginTop:8,background:C.surface2,borderRadius:7,padding:8,fontSize:12,color:C.textMuted}}><strong style={{color:C.text}}>Desarrollo:</strong> {r.desarrollo}</div>}
                  {(r.dificultad&&r.dificultad!=="-")&&<div style={{marginTop:6,display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:11,color:C.textDim}}>Dificultad:</span><span style={{fontSize:12,fontWeight:700,color:C.primary}}>{r.dificultad}/5</span></div>}
                  {r.comentario&&<div style={{marginTop:6,background:C.surface2,borderRadius:7,padding:8,fontSize:12,color:C.textMuted}}><strong style={{color:C.text}}>Comentario:</strong> {r.comentario}</div>}
                  {r.noPresentado&&<div style={{marginTop:6,background:C.errorBg,borderRadius:6,padding:"5px 10px",fontSize:11,color:C.error,fontWeight:700}}>No se presentó</div>}
                  {r.tiempoAgotado&&<div style={{marginTop:6,background:C.errorBg,borderRadius:6,padding:5,fontSize:11,color:C.error}}>Tiempo agotado</div>}
                </div>
              )))}

              {mesSubTab==="ref"&&(mesRes.length===0?<div style={{background:C.surface,borderRadius:12,padding:32,textAlign:"center",color:C.textDim}}>No hay evaluaciones.</div>:mesRes.map((r,i)=>{
                const key=mkKey(r.nombre,r.version);
                const errores=mesPrueba?mesPrueba.preguntas.filter(p=>p.tipo!=="desarrollo"&&r.respuestas&&r.respuestas[p.id]!==p.correcta):[];
                const rfAct=refuerzos[key]||"";
                const editando=refuerzoEdit[key]!==undefined?refuerzoEdit[key]:rfAct;
                return(
                  <div key={i} style={{background:C.surface,borderRadius:12,padding:16,marginBottom:10,border:"1px solid "+C.border}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                      <div><div style={{fontWeight:700,fontSize:14,color:C.text}}>{r.nombre}</div><div style={{fontSize:12,color:C.textMuted}}>{r.tienda}</div></div>
                      <div style={{background:pBg(r.puntaje),borderRadius:7,padding:"4px 10px",fontWeight:800,fontSize:14,color:pColor(r.puntaje)}}>{r.puntaje}/{r.total}</div>
                    </div>
                    {errores.length===0?<div style={{fontSize:12,color:"#4caf50",background:C.successBg,borderRadius:7,padding:"6px 10px",marginBottom:10}}>Sin errores</div>
                    :<div style={{marginBottom:10}}>{errores.map((p,j)=>(
                      <div key={j} style={{background:C.surface2,borderRadius:8,padding:"10px 12px",marginBottom:8,border:"1px solid "+C.border}}>
                        <div style={{fontSize:11,fontWeight:700,color:C.textMuted,marginBottom:6}}>Pregunta {mesPrueba.preguntas.indexOf(p)+1}</div>
                        <div style={{fontSize:12,color:C.text,marginBottom:8,lineHeight:1.5}}>{p.texto}</div>
                        <div style={{display:"flex",flexDirection:"column",gap:6}}>
                          <div style={{display:"flex",alignItems:"flex-start",gap:8,background:C.errorBg,borderRadius:6,padding:"7px 10px"}}>
                            <span style={{fontSize:13,fontWeight:800,color:C.error,flexShrink:0}}>X</span>
                            <div><div style={{fontSize:10,color:C.error,fontWeight:700,marginBottom:2}}>RESPONDIO</div><div style={{fontSize:12,color:C.text}}>{r.respuestas[p.id]||"Sin respuesta"}</div></div>
                          </div>
                          <div style={{display:"flex",alignItems:"flex-start",gap:8,background:C.successBg,borderRadius:6,padding:"7px 10px"}}>
                            <span style={{fontSize:13,fontWeight:800,color:"#4caf50",flexShrink:0}}>ok</span>
                            <div><div style={{fontSize:10,color:"#4caf50",fontWeight:700,marginBottom:2}}>CORRECTA</div><div style={{fontSize:12,color:C.text}}>{p.correcta}</div></div>
                          </div>
                        </div>
                      </div>
                    ))}</div>}
                    <textarea value={editando} onChange={e=>setRefuerzoEdit(re=>({...re,[key]:e.target.value}))} placeholder="Escribe los puntos a reforzar..." rows={2} style={{width:"100%",padding:"8px 10px",borderRadius:7,border:"1px solid "+C.border,fontSize:12,resize:"vertical",boxSizing:"border-box",marginBottom:7,background:C.surface2,color:C.text}}/>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button onClick={()=>guardarRF(r.nombre,r.version)} disabled={guardandoRF===key} style={{background:C.primary,color:"#fff",border:"none",borderRadius:7,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:700}}>{guardandoRF===key?"Guardando...":"Guardar"}</button>
                      {rfAct&&<span style={{fontSize:11,color:"#4caf50"}}>Guardado</span>}
                    </div>
                  </div>
                );
              }))}
            </div>
          )}

          {adminSec==="pruebas"&&adminTab==="editarMes"&&editPrueba&&(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                <button onClick={()=>setAdminTab("verMes")} style={{background:C.surface,border:"1px solid "+C.border,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:13,color:C.textMuted}}>Volver</button>
                <h2 style={{color:C.text,margin:0}}>Editar: {mesLabel}</h2>
              </div>
              <div style={{background:C.surface,borderRadius:14,padding:22,border:"1px solid "+C.border}}>
                <label style={{fontWeight:600,display:"block",marginBottom:5,fontSize:11,color:C.textMuted}}>VERSION</label>
                <input value={editPrueba.version} onChange={e=>setEditPrueba(p=>({...p,version:e.target.value}))} style={{...ss(20)}}/>
                <label style={{fontWeight:600,display:"block",marginBottom:5,fontSize:11,color:C.textMuted}}>RESPUESTA MODELO — PREGUNTA DE DESARROLLO</label>
                <textarea value={editPrueba.respuestaModelo||""} onChange={e=>setEditPrueba(p=>({...p,respuestaModelo:e.target.value}))} placeholder="Escribe aqui la respuesta ideal para la pregunta de desarrollo..." rows={4} style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid "+C.border,fontSize:13,resize:"vertical",boxSizing:"border-box",marginBottom:20,background:C.surface2,color:C.text}}/>
                <h3 style={{color:C.textMuted,marginBottom:12,fontSize:11}}>PREGUNTAS</h3>
                {(editPrueba.preguntas||[]).map((p,i)=>(
                  <div key={p.id} style={{border:"1px solid "+C.border,borderRadius:10,padding:14,marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <span style={{fontWeight:700,color:C.textMuted,fontSize:11}}>Pregunta {i+1}</span>
                      <button onClick={()=>setEditPrueba(ep=>({...ep,preguntas:ep.preguntas.filter(q=>q.id!==p.id)}))} style={{background:C.errorBg,border:"none",borderRadius:5,padding:"3px 9px",color:C.error,cursor:"pointer",fontSize:11}}>Eliminar</button>
                    </div>
                    <select value={p.seccion} onChange={e=>updatePQ(p.id,"seccion",e.target.value)} style={{...ss(7),fontSize:13}}>
                      <option>Verdadero o Falso</option><option>Seleccion Multiple</option><option>Desarrollo</option>
                    </select>
                    <select value={p.tipo} onChange={e=>updatePQ(p.id,"tipo",e.target.value)} style={{...ss(7),fontSize:13}}>
                      <option value="vof">Verdadero o Falso</option><option value="alternativas">Seleccion Multiple</option><option value="desarrollo">Desarrollo</option>
                    </select>
                    <textarea value={p.texto} onChange={e=>updatePQ(p.id,"texto",e.target.value)} rows={2} style={{width:"100%",padding:"8px 10px",borderRadius:7,border:"1px solid "+C.border,marginBottom:7,fontSize:13,resize:"vertical",boxSizing:"border-box",background:C.surface2,color:C.text}}/>
                    {p.tipo==="vof"&&<select value={p.correcta} onChange={e=>updatePQ(p.id,"correcta",e.target.value)} style={{...ss(0),fontSize:13}}><option>Verdadero</option><option>Falso</option></select>}
                    {p.tipo==="alternativas"&&<>
                      {(p.opciones||["","",""]).map((op,idx)=>(
                        <div key={idx} style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
                          <input type="radio" name={"c_"+p.id} checked={p.correcta===op} onChange={()=>updatePQ(p.id,"correcta",op)} style={{accentColor:C.primary}}/>
                          <input value={op} onChange={e=>updateOp(p.id,idx,e.target.value)} style={{flex:1,padding:"6px 9px",borderRadius:6,border:"1px solid "+C.border,fontSize:12,background:C.surface2,color:C.text}} placeholder={"Opcion "+(idx+1)}/>
                          {(p.opciones||[]).length>3&&<button onClick={()=>setEditPrueba(ep=>({...ep,preguntas:ep.preguntas.map(q=>{if(q.id!==p.id)return q;const ops=q.opciones.filter((_,i)=>i!==idx);return{...q,opciones:ops,correcta:ops.includes(q.correcta)?q.correcta:""};})}))} style={{background:C.errorBg,border:"none",borderRadius:5,padding:"3px 7px",color:C.error,cursor:"pointer",fontSize:11}}>X</button>}
                        </div>
                      ))}
                      <button onClick={()=>setEditPrueba(ep=>({...ep,preguntas:ep.preguntas.map(q=>q.id!==p.id?q:{...q,opciones:[...(q.opciones||["","",""]),""]})}))
                      } style={{background:C.surface,border:"1px dashed "+C.border,borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer",color:C.textMuted,marginTop:2}}>+ Agregar opcion</button>
                    </>}
                  </div>
                ))}
                <button onClick={()=>setEditPrueba(p=>({...p,preguntas:[...(p.preguntas||[]),{id:Date.now(),seccion:"Verdadero o Falso",texto:"",tipo:"vof",correcta:"Verdadero"}]}))} style={{width:"100%",background:"transparent",border:"1px dashed "+C.border,borderRadius:9,padding:"10px 0",fontSize:13,cursor:"pointer",marginBottom:12,color:C.textMuted}}>+ Agregar pregunta</button>
                <button onClick={guardarPrueba} disabled={guardandoPrueba} style={bP}>{guardandoPrueba?"Guardando...":"Guardar prueba"}</button>
              </div>
            </div>
          )}

          {adminSec==="pruebas"&&adminTab==="global"&&!vendedorDetalle&&(
            <div>
              <h2 style={{color:C.text,marginTop:0,marginBottom:4}}>Informe Global</h2>
              <p style={{color:C.textMuted,fontSize:13,marginBottom:20}}>Consolidado de {mesesConDatos.length} prueba(s)</p>
              {mesesConDatos.length===0
                ?<div style={{background:C.surface,borderRadius:12,padding:32,textAlign:"center",color:C.textDim}}>Aun no hay pruebas con evaluaciones.</div>
                :<>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:20}}>
                    {(()=>{const all=allRes();const pts=all.map(r=>r.puntaje);const prom=pts.length?(pts.reduce((a,b)=>a+b,0)/pts.length).toFixed(2):"-";return[{l:"Total evaluaciones",v:all.length},{l:"Promedio global",v:prom+"/10"},{l:"Pruebas realizadas",v:mesesConDatos.length}].map(c=><div key={c.l} style={{background:C.surface,borderRadius:10,padding:14,textAlign:"center",border:"1px solid "+C.border}}><div style={{fontSize:20,fontWeight:800,color:C.primary}}>{c.v}</div><div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{c.l}</div></div>);})()}
                  </div>
                  <div style={{background:C.surface,borderRadius:12,padding:20,marginBottom:16,border:"1px solid "+C.border}}>
                    <h3 style={{marginTop:0,color:C.text,fontSize:13,marginBottom:14}}>Promedio por tienda</h3>
                    {globalPorTienda().map((t,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
                        <span style={{fontSize:13,color:C.text,width:160,flexShrink:0}}>{t.tienda}</span>
                        <div style={{flex:1,background:C.border,borderRadius:4,height:20}}><div style={{width:((t.prom/10)*100)+"%",background:Number(t.prom)>=8?"#4caf50":Number(t.prom)>=6?C.warning:C.primary,borderRadius:4,height:"100%"}}/></div>
                        <span style={{fontSize:13,fontWeight:700,color:C.primary,width:50,flexShrink:0}}>{t.prom}/10</span>
                        <span style={{fontSize:11,color:C.textDim,width:60,flexShrink:0}}>{t.count} eval.</span>
                      </div>
                    ))}
                  </div>
                  <div style={{background:C.surface,borderRadius:12,padding:20,border:"1px solid "+C.border}}>
                    <h3 style={{marginTop:0,color:C.text,fontSize:13,marginBottom:4}}>Promedio por vendedor</h3>
                    <p style={{color:C.textMuted,fontSize:12,marginBottom:14}}>Clic para ver detalle</p>
                    {globalPorVendedor().map((v,i)=>(
                      <div key={i} onClick={()=>setVendedorDetalle(v.nombre)} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,padding:"8px 10px",borderRadius:8,cursor:"pointer",border:"1px solid "+C.border,background:C.surface2}}
                        onMouseEnter={e=>e.currentTarget.style.borderColor=C.primary} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                        <span style={{fontSize:12,color:C.text,flex:1}}>{v.nombre}</span>
                        <span style={{fontSize:11,color:C.textMuted,width:100,flexShrink:0}}>{v.tienda}</span>
                        <span style={{fontSize:11,color:C.textDim,width:65,flexShrink:0}}>{v.meses.length} prueba(s)</span>
                        <div style={{background:pBg(Number(v.prom)),borderRadius:7,padding:"3px 10px",fontWeight:700,fontSize:13,color:pColor(Number(v.prom))}}>{v.prom}/10</div>
                        <span style={{fontSize:12,color:C.textDim}}>{">"}</span>
                      </div>
                    ))}
                  </div>
                </>
              }
            </div>
          )}

          {adminSec==="pruebas"&&adminTab==="global"&&vendedorDetalle&&(
            <VendedorDetalle nombre={vendedorDetalle} onVolver={()=>setVendedorDetalle(null)} mesesConDatos={mesesConDatos} resultados={resultados} refuerzos={refuerzos} feedbacks={feedbacks}/>
          )}

          {adminSec==="equipo"&&adminTab==="tiendas"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:12,flexWrap:"wrap"}}>
                <h2 style={{color:C.text,margin:0}}>Tiendas y vendedores</h2>
                {equipoCambiado&&<button onClick={guardarEquipo} disabled={guardandoEquipo} style={{background:"#1a7a3a",color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",cursor:"pointer",fontWeight:700,fontSize:14,boxShadow:"0 0 0 3px #1a7a3a44"}}>{guardandoEquipo?"Guardando...":"Guardar cambios"}</button>}
              </div>
              {equipoCambiado&&<div style={{background:"#2e2200",border:"1px solid #f57f17",borderRadius:8,padding:"9px 14px",marginBottom:14,fontSize:12,color:"#f57f17"}}>Hay cambios sin guardar. Presiona "Guardar cambios" para confirmar.</div>}
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                <input value={nuevaTienda} onChange={e=>setNuevaTienda(e.target.value)} placeholder="Nueva tienda..." onKeyDown={e=>e.key==="Enter"&&agregarTienda()} style={{flex:1,padding:"9px 12px",borderRadius:8,border:"1px solid "+C.border,fontSize:13,background:C.surface2,color:C.text}}/>
                <button onClick={agregarTienda} style={{background:C.primary,color:"#fff",border:"none",borderRadius:8,padding:"9px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>+ Agregar</button>
              </div>
              {draftT().map(t=>{
                const trabDeEstaTienda=draftW().filter(w=>w.tienda===t);
                return(
                  <div key={t} style={{border:"1px solid "+C.border,borderRadius:10,marginBottom:8,overflow:"hidden"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",background:C.surface,cursor:"pointer"}} onClick={()=>setTiendaExp(tiendaExp===t?null:t)}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{color:C.textMuted,fontSize:11}}>{tiendaExp===t?"v":">"}</span>
                        <span style={{fontWeight:600,fontSize:14,color:C.text}}>{t}</span>
                        <span style={{fontSize:11,color:C.textDim}}>({trabDeEstaTienda.length})</span>
                      </div>
                      <button onClick={e=>{e.stopPropagation();eliminarTienda(t);}} style={{background:C.errorBg,border:"none",borderRadius:5,padding:"3px 8px",color:C.error,cursor:"pointer",fontSize:11}}>X</button>
                    </div>
                    {tiendaExp===t&&<div style={{padding:12,background:C.surface2}}>
                      {trabDeEstaTienda.map((w,i)=>{
                        const idxReal=draftW().findIndex(x=>x.nombre===w.nombre&&x.tienda===w.tienda);
                        return(
                          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",background:C.surface,borderRadius:7,marginBottom:4}}>
                            <span style={{fontSize:13,color:C.text}}>{w.nombre}</span>
                            <button onClick={()=>eliminarTrab(idxReal)} style={{background:C.errorBg,border:"none",borderRadius:5,padding:"2px 7px",color:C.error,cursor:"pointer",fontSize:11}}>X</button>
                          </div>
                        );
                      })}
                      <div style={{display:"flex",gap:7,marginTop:8}}>
                        <input value={nuevoTrab.tienda===t?nuevoTrab.nombre:""} onChange={e=>setNuevoTrab({nombre:e.target.value,tienda:t})} placeholder="Nombre del vendedor" onKeyDown={e=>e.key==="Enter"&&nuevoTrab.tienda===t&&agregarTrab(t)} style={{flex:1,padding:"7px 10px",borderRadius:7,border:"1px solid "+C.border,fontSize:12,background:C.surface,color:C.text}}/>
                        <button onClick={()=>agregarTrab(t)} style={{background:C.primary,color:"#fff",border:"none",borderRadius:7,padding:"7px 12px",cursor:"pointer",fontSize:13,fontWeight:700}}>+</button>
                      </div>
                    </div>}
                  </div>
                );
              })}
              {equipoCambiado&&<button onClick={guardarEquipo} disabled={guardandoEquipo} style={{...bP,marginTop:12,background:"#1a7a3a"}}>{guardandoEquipo?"Guardando...":"Guardar cambios"}</button>}
            </div>
          )}

          {adminSec==="equipo"&&adminTab==="embajadores"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:12,flexWrap:"wrap"}}>
                <h2 style={{color:C.text,margin:0}}>Embajadores</h2>
                {equipoCambiado&&<button onClick={guardarEquipo} disabled={guardandoEquipo} style={{background:"#1a7a3a",color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",cursor:"pointer",fontWeight:700,fontSize:14,boxShadow:"0 0 0 3px #1a7a3a44"}}>{guardandoEquipo?"Guardando...":"Guardar cambios"}</button>}
              </div>
              {equipoCambiado&&<div style={{background:"#2e2200",border:"1px solid #f57f17",borderRadius:8,padding:"9px 14px",marginBottom:14,fontSize:12,color:"#f57f17"}}>Hay cambios sin guardar. Presiona "Guardar cambios" para confirmar.</div>}
              <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
                <input value={nuevoEmb.nombre} onChange={e=>setNuevoEmb(n=>({...n,nombre:e.target.value}))} placeholder="Nombre del embajador" style={{flex:1,padding:"9px 12px",borderRadius:8,border:"1px solid "+C.border,fontSize:13,background:C.surface2,color:C.text,minWidth:160}}/>
                <select value={nuevoEmb.tienda} onChange={e=>setNuevoEmb(n=>({...n,tienda:e.target.value}))} style={{padding:"9px 12px",borderRadius:8,border:"1px solid "+C.border,fontSize:13,background:C.surface2,color:C.text}}>
                  <option value="">Tienda</option>{draftT().map(t=><option key={t}>{t}</option>)}
                </select>
                <button onClick={agregarEmb} style={{background:C.primary,color:"#fff",border:"none",borderRadius:8,padding:"9px 16px",cursor:"pointer",fontWeight:700,fontSize:13}}>+ Agregar</button>
              </div>
              {draftT().map(t=>{const embs=draftE().filter(e=>e.tienda===t);if(!embs.length)return null;return(
                <div key={t} style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.primary,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5}}>{t}</div>
                  {embs.map((e,i)=>{
                    const idxReal=draftE().findIndex(x=>x.nombre===e.nombre&&x.tienda===e.tienda);
                    return(
                      <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:C.surface,borderRadius:8,marginBottom:4,border:"1px solid "+C.border}}>
                        <span style={{fontSize:13,color:C.text}}>&#11088; {e.nombre}</span>
                        <button onClick={()=>eliminarEmb(idxReal)} style={{background:C.errorBg,border:"none",borderRadius:5,padding:"2px 7px",color:C.error,cursor:"pointer",fontSize:11}}>X</button>
                      </div>
                    );
                  })}
                </div>
              );})}
              {equipoCambiado&&<button onClick={guardarEquipo} disabled={guardandoEquipo} style={{...bP,marginTop:12,background:"#1a7a3a"}}>{guardandoEquipo?"Guardando...":"Guardar cambios"}</button>}
            </div>
          )}

        </div>
      </div>
    );
  }
}
