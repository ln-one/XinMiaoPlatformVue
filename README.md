# XinMiao Campus Platform

## Overview
XinMiao Platform is a comprehensive campus service platform designed for freshmen students, providing a one-stop solution to help new students quickly adapt to campus life.

## Documentation
For Chinese documentation, please see [中文文档](https://github.com/ln-one/XinMiaoPlatformVue/blob/main/README.zh-CN.md)

## Development Guide for Newcomers

### Prerequisites
1. Install Node.js (v14.0.0 or above)
2. Install Git
3. Basic understanding of:
   - HTML/CSS/JavaScript
   - Vue.js basics
   - npm package management

### Project Setup
```bash
# 1. Clone the repository
git clone https://github.com/your-username/XinMiaoPlatform.git

# 2. Navigate to project directory
cd XinMiaoPlatform

# 3. Install dependencies
npm install

# 4. Create .env file for environment variables
cp .env.example .env

# 5. Start development server
npm run serve
```

### Project Structure
```
src/
│
├── assets/          # Static assets (images, global styles)
│   ├── styles/     # Global CSS files
│   └── images/     # Image resources
│
├── components/     # Reusable Vue components
│   ├── Auth/      # Authentication related components
│   ├── Common/    # Common UI components
│   └── Profile/   # Profile related components
│
├── views/         # Page components
│   ├── HomeView.vue
│   ├── AuthView.vue
│   └── ProfileView.vue
│
├── store/         # Vuex state management
│   ├── index.js
│   └── modules/
│       └── auth.js
│
├── services/      # API services
│   └── api.js
│
└── router/        # Vue Router configuration
    └── index.js
```

### Development Guidelines

#### 1. Adding New Features
1. Create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Follow the existing component structure
3. Use provided CSS variables for consistent styling
4. Implement error handling
5. Add appropriate comments
6. Test thoroughly

#### 2. Component Development
```vue
// Example component structure
<template>
  <div class="component-container">
    <!-- Template structure -->
  </div>
</template>

<script>
export default {
  name: 'ComponentName',
  // Component logic
}
</script>

<style scoped>
/* Use provided CSS variables */
.component-container {
  background: var(--bg-primary);
  color: var(--text-primary);
}
</style>
```

#### 3. API Integration
```javascript
// Using the API service
import api from '@/services/api'

// Example API call
try {
  const response = await api.someEndpoint(data)
  // Handle success
} catch (error) {
  // Handle error
}
```

#### 4. State Management
```javascript
// Using Vuex store
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('moduleName', ['stateProp'])
  },
  methods: {
    ...mapActions('moduleName', ['actionName'])
  }
}
```

## Features
- 🔐 **Account Management**
  - Secure login/registration system
  - Password recovery
  - Personal information management
  
- 🎓 **Pre-enrollment Preparation** 
  - Admission notice guidance
  - Document checklist
  - Dormitory arrangements

- 💡 **Personalized Recommendations**
  - Course suggestions
  - Club recommendations 
  - Campus activities

## Technical Features
- Vue.js & Element UI
- Light/Dark theme support
- Accessibility enhanced
- Responsive design
- RESTful API integration
- JWT Authentication

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Common Issues & Solutions
1. **NPM Install Fails**
   - Clear npm cache: `npm cache clean -f`
   - Delete node_modules and reinstall

2. **Development Server Issues**
   - Check port conflicts
   - Verify Node.js version

3. **API Connection Issues**
   - Verify API endpoint in .env file
   - Check network connectivity
   - Verify token validity

## Complete Beginner's Guide

### Step 0: Absolute Basics
1. **Command Line Basics**
   - Press `Win + R`, type `cmd`
   - Basic commands:
     ```bash
     cd foldername  # Enter folder
     dir            # List contents
     cd ..          # Go back
     ```

2. **Pre-installation**
   - Disable antivirus temporarily
   - Ensure 10GB+ free space in C:
   - Stable internet connection

3. **Development Tools Installation**
   - Follow this sequence:
     ```bash
     # 1. Download Installers
     > Visit official websites
     > Click "Download" button
     > Run installer
     
     # 2. Verify Installation
     > Press Win + R
     > Type cmd
     > Enter these commands:
     node -v
     npm -v
     git --version
     ```

### Practice: Your First Feature

1. **Setup**
   ```bash
   # 1. Open VS Code
   # 2. Press Ctrl+` for terminal
   # 3. Enter:
   git checkout -b feature/my-first-feature
   ```

2. **Code Changes Steps**
   ```bash
   # 1. Create new file in src/views
   # 2. Copy template below
   # 3. Modify as needed
   ```

3. **Code Template (Copy This)**
   ```vue
   <template>
     <div class="page-container">
       <!-- Step 1: Change title -->
       <h1>My New Page</h1>
       
       <!-- Step 2: Add your features -->
       <div class="content">
         <!-- Write content here -->
       </div>
     </div>
   </template>

   <script>
   // Step 3: Change name
   export default {
     name: 'MyNewPage',
     data() {
       return {
         // Step 4: Add required data
         message: 'Hello'
       }
     },
     methods: {
       // Step 5: Add required methods
       sayHello() {
         alert(this.message)
       }
     }
   }
   </script>

   <style scoped>
   /* Step 6: Add required styles */
   .page-container {
     padding: 20px;
   }
   </style>
   ```

4. **Testing Steps**
   ```bash
   # 1. Save file (Ctrl + S)
   # 2. Check browser
   # 3. If errors occur:
   #    - Check browser console (F12)
   #    - Check VS Code terminal
   ```