---
theme: dashboard
title: Example 2
toc: false
---

# Rocket launches 🚀

<!-- Load and transform the data -->

```js
const launches = FileAttachment("././enaho-gobernabilidad.csv").csv({typed: true});
```

<!-- A shared color scale for consistency, sorted by the number of launches -->

```js
const color = Plot.scale({
  color: {
    type: "categorical",
    domain: d3.groupSort(launches, (D) => -D.length, (d) => d.P1$01).filter((d) => d !== "Other"),
    unknown: "var(--theme-foreground-muted)"
  }
});
```

<!-- Cards with big numbers -->

<!-- <div class="grid grid-cols-4">
  <div class="card">
    <h2>United States 🇺🇸</h2>
    <span class="big">${launches.filter((d) => d.P1$01 === "1").length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Russia 🇷🇺 <span class="muted">/ Soviet Union</span></h2>
    <span class="big">${launches.filter((d) => d.P1$01 === "2").length.toLocaleString("en-US")}</span>
  </div> -->
  <!-- <div class="card">
    <h2>China 🇨🇳</h2>
    <span class="big">${launches.filter((d) => d.stateId === "CN").length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Other</h2>
    <span class="big">${launches.filter((d) => d.stateId !== "US" && d.stateId !== "SU" && d.stateId !== "RU" && d.stateId !== "CN").length.toLocaleString("en-US")}</span>
  </div> -->
<!-- </div> -->

<!-- Plot of launch history -->

```js
function launchTimeline(data, {width} = {}) {
  return Plot.plot({
    title: "Launches over the years",
    width,
    height: 300,
    y: {grid: true, label: "Launches"},
    color: {...color, legend: true},
    marks: [
      Plot.rectY(data, Plot.binX({y: "count"}, {x: "P2C$06", fill: "P2C$06", interval: 1, tip: true})),
      Plot.ruleY([0])
    ]
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => launchTimeline(launches, {width}))}
  </div>
</div>


```js
function getMonthName(monthNum) {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return months[parseInt(monthNum) - 1];  // Convierte el mes numérico a índice de array (restando 1)
}
launches.forEach(d => {
  d.MES = getMonthName(d.MES);  // Convierte "01" a "Enero", "02" a "Febrero", etc.
});
function launchTimeline1(data, {width} = {}) {

  return Plot.plot({
    title: "Valores por Mes",
    height: 300,
    x: {
      label: "MES",
      domain: data.map(d => d.MES)  // Usar los nombres de los meses como dominio en el eje X
    },
    y: { 
      grid: true,
      label: "Valor"
    },
    marks: [
      Plot.barY(data, Plot.binX({y: "count"}, {x: "MES", fill: "P2C$06", interval: 1, tip: true})),
      Plot.ruleY([0])
      //Plot.barY(data, {x: "MES", y: "value", fill: "orange"})
    ]
  });
}
// function launchTimeline1(data, {width} = {}) {
//   return Plot.plot({
//     title: "ENAHO Data over the Years",
//     width: width,
//     height: 300,
//     x: {
//       label: "Año",  // Etiqueta del eje X
//       tickFormat: (d) => d,  // Formato del eje X (como un número o año)
//     },
//     y: { 
//       grid: true, 
//       label: "Valor"  // Etiqueta del eje Y
//     },
//     color: { legend: true },  // Si tienes diferentes categorías de color, puedes usar esto
//     marks: [
//       // Gráfico de líneas con la variable P2C$06 en el eje X (Año) y el valor en el eje Y
//       Plot.lineY(data, { 
//         y: "P2C$06",  // Año
//         x: "AÑO",   // Variable a graficar
//         stroke: "var(--theme-foreground-focus)"  // Color de la línea
//       }),
//       // Plot.ruleY([0]),  // Añadir una línea horizontal en Y=0 (puede ser útil como referencia)
//       // Plot.binX(data, { 
//       //   y: "count",  // Contar el número de registros por año
//       //   x: "P2C$06", 
//       //   interval: 1  // Intervalo de 1 año (si lo necesitas)
//       // })
//     ]
//   });
// }
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => launchTimeline1(launches, {width}))}
  </div>
</div>

<!-- Plot of launch vehicles -->

<!-- ```js
function vehicleChart(data, {width}) {
  return Plot.plot({
    title: "Popular launch vehicles",
    width,
    height: 300,
    marginTop: 0,
    marginLeft: 50,
    x: {grid: true, label: "Launches"},
    y: {label: null},
    color: {...color, legend: true},
    marks: [
      Plot.rectX(data, Plot.groupY({x: "count"}, {y: "family", fill: "state", tip: true, sort: {y: "-x"}})),
      Plot.ruleX([0])
    ]
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => vehicleChart(launches, {width}))}
  </div>
</div>

Data: Jonathan C. McDowell, [General Catalog of Artificial Space Objects](https://planet4589.org/space/gcat) -->
