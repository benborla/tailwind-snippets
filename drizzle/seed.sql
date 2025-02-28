INSERT INTO snippets (title, description, code, category) VALUES
('Responsive Card with Hover Effect', 
'A clean card design with smooth hover animation and responsive padding', 
'<div class="transform transition-all hover:scale-105 duration-300 bg-white rounded-xl shadow-lg overflow-hidden">
  <div class="p-4 sm:p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-2">Card Title</h3>
    <p class="text-gray-600">Card content goes here with responsive padding and smooth scaling effect on hover.</p>
  </div>
</div>', 
'Components'),

('Gradient Button with Animation', 
'Modern gradient button with hover animation', 
'<button class="px-6 py-2 font-medium text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-pink-500 hover:to-purple-500 hover:shadow-lg">
  Click me
</button>', 
'Buttons'),

('Responsive Navigation Bar', 
'Clean navigation bar with mobile menu support', 
'<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <div class="flex space-x-7">
        <a href="#" class="flex items-center py-4 px-2">
          <span class="font-semibold text-gray-500 text-lg">Logo</span>
        </a>
        <div class="hidden md:flex items-center space-x-1">
          <a href="#" class="py-4 px-2 text-gray-500 hover:text-gray-900 transition duration-300">Home</a>
          <a href="#" class="py-4 px-2 text-gray-500 hover:text-gray-900 transition duration-300">About</a>
          <a href="#" class="py-4 px-2 text-gray-500 hover:text-gray-900 transition duration-300">Services</a>
        </div>
      </div>
    </div>
  </div>
</nav>', 
'Navigation'),

('Form Input with Floating Label', 
'Modern form input with floating label animation', 
'<div class="relative">
  <input type="text" id="floating_input" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
  <label for="floating_input" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Floating Label</label>
</div>', 
'Forms'),

('Alert Component', 
'Versatile alert component with icon', 
'<div class="p-4 mb-4 text-sm rounded-lg bg-green-50 text-green-800 flex items-center" role="alert">
  <svg class="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
  <span>Success alert message goes here</span>
</div>', 
'Alerts'); 