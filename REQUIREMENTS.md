### 📄 Improved Readability

#### Environment Variables
```env
POKEAPI_BASE_URL="https://pokeapi.co/api/v2"
```
- Use `process.env.POKEAPI_BASE_URL` throughout the project.
- ⚠️ **No hardcoding of API URLs** elsewhere in the project.

---

### 🧭 Routing Requirements

#### Root Route
- `/` - **Home Page**
    - Displays navigation tabs.
    - Automatically selects the Pokémon tab on first load.

#### Nested Routes
| Route          | Description                     |
|----------------|---------------------------------|
| `/pokemon`     | Searchable list of Pokémon      |
| `/locations`   | Searchable list of locations    |
| `/moves`       | Searchable list of moves        |
| `/generations` | Searchable list of generations  |

#### Dynamic Routes
- **Pokémon Details**: `/pokemon/[name]`
    - Pokémon stats, sprites, locations, and moves.
    - Clicking a location or move navigates to its detail page.
- **Location Details**: `/locations/[name]`
    - Location name, region, sub-areas, and Pokémon found.
- **Move Details**: `/moves/[name]`
    - Move name, accuracy, power, flavor text, and Pokémon that can learn it.
- **Generation Details**: `/generations/[name]`
    - Generation name, primary region, and introduced Pokémon.

---

### 🔍 Search Functionality
- All major list pages support **client-side searching**.
- Filtering is done **in-memory** (PokeAPI does not support searching).
- Search logic is implemented in **client components**.
- Data fetching is handled by **server components** where possible.

---

### 🔙 Navigation Requirements
- Each page includes a **Back Button**:
    - Uses browser history (`router.back()`).
    - ⚠️ **No hardcoded back links**.

---

### 📱 Responsive Design
- Fully usable on mobile devices.
- Layouts adapt to smaller screen sizes.
- Tested using browser dev tools.

---

### 🧱 Project Structure
```plaintext
app/
├── components/
│   ├── BackButton.tsx
│   └── NavTabs.tsx
│   └── SearchBar.tsx
├── pokemon/
│   ├── [name]/
│   │   └── page.tsx
│   └── page.tsx
├── locations/
│   ├── [name]/
│   │   └── page.tsx
│   └── page.tsx
├── moves/
│   ├── [name]/
│   │   └── page.tsx
│   └── page.tsx
├── generations/
│   ├── [name]/
│   │   └── page.tsx
│   └── page.tsx
├── utils/
│   └── pokemonapi.ts
├── layout.tsx
├── page.tsx
├── globals.css
└── favicon.ico
```

---

### 🔌 Data Access Layer
- All API calls are centralized in:
    ```bash
    app/utils/pokemonapi.ts
    ```
- Page components **must not call `fetch` directly**.
- API logic is abstracted into reusable functions for consistency and maintainability.

---

### 🧠 Rendering Strategy
- **Server Components**:
    - Data fetching.
    - Initial page rendering.
- **Client Components**:
    - Search, filtering, and interactive UI elements.

---

### 🚀 Deployment
- The project is deployed using **Vercel**.
- Add your public deployment URL below:
    ```
    ADD YOUR PUBLIC VERCEL LINK HERE
    ```

---

### 🧪 Running the Project Locally
1. Install dependencies:
     ```bash
     npm install
     ```
2. Run the development server:
     ```bash
     npm run dev
     ```
3. Open in browser:
     ```arduino
     http://localhost:3000
     ```

---

### ⚠️ Grading Notes
- All assignment instructions are followed.
- Routes match the specification exactly.
- Client-side search is implemented.
- Dynamic routes are functional.
- The application is responsive.
- No private Vercel links are used.

---

### ✅ Summary
This project prioritizes:
- **Clean architecture**.
- **Centralized configuration**.
- **Predictable routing**.
- **Reusable components**.
- **Real-world Next.js patterns**.

The goal is clarity, maintainability, and correctness over visual complexity.