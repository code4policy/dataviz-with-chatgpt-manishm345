// Data: Top 10 reasons for 311 calls
const top10Data = [
    { reason: "Enforcement & Abandoned Vehicles", count: 61541 },
    { reason: "Sanitation", count: 59389 },
    { reason: "Street Cleaning", count: 45659 },
    { reason: "Code Enforcement", count: 31812 },
    { reason: "Highway Maintenance", count: 25096 },
    { reason: "Signs & Signals", count: 11209 },
    { reason: "Trees", count: 10390 },
    { reason: "Recycling", count: 9955 },
    { reason: "Park Maintenance & Safety", count: 7932 },
    { reason: "Housing", count: 7590 }
];

// Data: Full dataset (replace with your actual data for all reasons)
const fullData = [
    { reason: "Enforcement & Abandoned Vehicles", count: 61541 },
    { reason: "Sanitation", count: 59389 },
    { reason: "Street Cleaning", count: 45659 },
    { reason: "Code Enforcement", count: 31812 },
    { reason: "Highway Maintenance", count: 25096 },
    { reason: "Signs & Signals", count: 11209 },
    { reason: "Trees", count: 10390 },
    { reason: "Recycling", count: 9955 },
    { reason: "Park Maintenance & Safety", count: 7932 },
    { reason: "Housing", count: 7590 },
    { reason: "Needle Program", count: 7413 },
    { reason: "Animal Issues", count: 4155 },
    { reason: "Environmental Services", count: 4416 },
    { reason: "Graffiti", count: 1839 },
    { reason: "Health", count: 1349 },
    { reason: "Noise Disturbance", count: 832 },
    { reason: "Traffic Management & Engineering", count: 751 },
    { reason: "Catchbasin", count: 621 }
];

// Dimensions and margins
const width = 1000;
const height = 600;
const margin = { top: 20, right: 50, bottom: 50, left: 200 };

// SVG element
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// Function to render the bar chart
function renderChart(data) {
    // Clear the SVG
    svg.selectAll("*").remove();

    // Scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.reason))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format("~s")));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", margin.left)
        .attr("y", d => y(d.reason))
        .attr("width", d => x(d.count) - margin.left)
        .attr("height", y.bandwidth());

    // Labels (Counts)
    svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => x(d.count) + 5) // Place just outside the bar
        .attr("y", d => y(d.reason) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .style("font-size", "12px") // Match reason font size
        .style("fill", "black")
        .text(d => d.count);
}

// Initial render: Top 10 data
renderChart(top10Data);

// Toggle button functionality
let isTop10 = true;
document.getElementById("toggleButton").addEventListener("click", () => {
    isTop10 = !isTop10;
    renderChart(isTop10 ? top10Data : fullData);
    document.getElementById("toggleButton").textContent = isTop10 ? "Show All Reasons" : "Show Top 10 Reasons";
});
