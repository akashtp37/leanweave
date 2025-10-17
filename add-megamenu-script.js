// Utility script to add mega-menu.js to service pages
// This is a temporary script to help bulk update the files

const servicePagesToUpdate = [
    'flutter-services.html',
    'ios-services.html', 
    'reactnative-services.html',
    'c-cpp-services.html',
    'dotnet-services.html',
    'frontend-services.html',
    'golang-services.html',
    'java-services.html',
    'mobileapp-services.html',
    'nodejs-services.html',
    'php-services.html',
    'python-services.html',
    'ruby-services.html',
    'rust-services.html',
    'scala-services.html',
    'vue-services.html'
];

// Instructions for manual update:
// For each file, add this line before the existing service-specific JS:
// <script src="js/mega-menu.js"></script>

console.log('Files to update:', servicePagesToUpdate);