# Artworks Manager (React + PrimeReact)

A responsive React application built with TypeScript and Vite that allows users to browse artworks from the Art Institute of Chicago API. It features server-side pagination, complex row selection logic, and a custom UI component for bulk selecting rows.

## ✨ Features

* **Paginated Data Table:** Efficiently handles large datasets using server-side pagination.
* **Persistent Selection:**
* Standard checkbox selection for individual rows.
* **Custom "Select N" Feature:** Automatically selects the first *N* rows on the current page via an overlay panel.
* Maintains selection state accurately across different pages.


* **Responsive UI:** Built with [PrimeReact](https://primereact.org/) components and PrimeFlex for a clean, modern interface.
* **Type Safety:** Fully typed with TypeScript for robust development.

## 🛠️ Tech Stack

* **Framework:** React 19 (Vite)
* **Language:** TypeScript
* **UI Library:** PrimeReact 10 + PrimeFlex + PrimeIcons
* **HTTP Client:** Axios
* **Linting:** ESLint

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have **Node.js** (version 18 or higher recommended) installed.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yashparmar1125/growmeorganic.git
cd growmeorganic

```


2. **Install dependencies:**
```bash
npm install

```



### Running the App

Start the development server:

```bash
npm run dev

```

Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build

```

To preview the production build locally:

```bash
npm run preview

```

## hgfw Project Structure

```text
src/
├── api/             # Axios instance configuration
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components (Navbar, etc.)
├── services/        # API service functions (fetchArtworks)
├── types/           # TypeScript interfaces (Artwork, API responses)
├── App.tsx          # Main application logic and layout
└── main.tsx         # Entry point

```

## 🧩 Key Logic Explained

### Selection State Management

The app uses a dual-state approach to handle row selection effectively:

1. **`selectedIds` (Set<number>):** Acts as the source of truth for all selected items across pages. It allows for O(1) lookups to check if an item is selected.
2. **`rowSelection` (Array):** Syncs with the `DataTable`'s `selection` prop to visually render checkboxes. This is updated whenever the page changes or the user manually selects rows.

### Custom "Select Custom..." Overlay

The overlay allows users to input a number (e.g., "5") to select the top 5 rows on the current view. This logic:

1. Calculates the cap based on available rows.
2. Iterates through the current page data.
3. Updates both the visual state and the internal ID Set simultaneously to prevent synchronization issues.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git pushmW origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
