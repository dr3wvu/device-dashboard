🛰️ Device + Map Dashboard
A high-performance React + Vite network monitoring dashboard designed for real-time device tracking and signal telemetry. This project features a custom Geospatial Map and Analytical Perspectives to visualize device health across the Greater Toronto Area.

🚀 Features
Toronto-Centric Geospatial Mapping: Integrated Leaflet map with custom bounding boxes to ensure all device telemetry stays on-land within Toronto.

Signal Heatmap Visualization: Dynamic heatmap gradients that transition through custom signal buckets (Good, Average, Bad, No Signal).

Minimalist Analytical Dashboard: Highcharts integration featuring minimalist "anchor" headers and high-contrast tooltips.

Global Filter Context: A centralized filter state that synchronizes the Date Range, Device Manufacturer, and OS Versions across both Map and Chart views.

Responsive Data Table: Real-time filtering of device logs with status indicators and signal strength telemetry.

📸 Project Showroom
Network Map & Device Telemetry
Visualize signal dead-zones and device density with our custom heatmap and sapphire-themed markers.

Analytical Insights
Deep-dive into OS distribution, manufacturer market share, and network load trends.

🛠️ Tech Stack
Framework: React 18 (Vite)

Mapping: React-Leaflet & Leaflet.heat

Charts: Highcharts & Highcharts React

Styling: Custom CSS3 (Glassmorphism & Sapphire Dark Theme)

State Management: React Context API (FilterProvider)

[Dashboard Demo]
(./public/devicedashboard.png)
(./public/MapDashboard.png)
(./public/Cascading.gif)
(./public/MapGif.gif)

🏗️ Getting Started
Clone and Install:
npm install

Run Development Server:
npm run dev

Build for Production:
npm run build
