document.addEventListener('DOMContentLoaded', function() {
            // Image upload functionality
            const uploadTrigger = document.getElementById('uploadTrigger');
            const imageUpload = document.getElementById('imageUpload');
            const imagePreview = document.getElementById('imagePreview');
            const previewImage = document.getElementById('previewImage');
            const icon = imagePreview.querySelector('i');
            
            uploadTrigger.addEventListener('click', function() {
                imageUpload.click();
            });
            
            imageUpload.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    
                    reader.addEventListener('load', function() {
                        previewImage.setAttribute('src', this.result);
                        previewImage.style.display = 'block';
                        icon.style.display = 'none';
                    });
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Form submission
            const registrationForm = document.getElementById('registrationForm');
            const formContainer = document.getElementById('formContainer');
            const outputContainer = document.getElementById('outputContainer');
            const alertMessage = document.getElementById('alertMessage');
            const backToForm = document.getElementById('backToForm');
            
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const fullName = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const profession = document.getElementById('profession').value;
                const address = document.getElementById('address').value;
                const bio = document.getElementById('bio').value;
                const imageSrc = previewImage.getAttribute('src');
                
                // Validate form
                if (!fullName || !email || !phone || !profession || !address) {
                    showAlert('Please fill in all required fields!', 'error');
                    return;
                }
                
                // Update ID card
                document.getElementById('idCardName').textContent = fullName;
                document.getElementById('idCardEmail').textContent = email;
                document.getElementById('idCardPhone').textContent = phone;
                document.getElementById('idCardProfession').textContent = profession;
                document.getElementById('idCardAddress').textContent = address;
                document.getElementById('idCardBio').textContent = bio || 'No bio provided';
                
                // Generate random ID
                const randomId = 'ID' + Math.floor(100000 + Math.random() * 900000);
                document.getElementById('idCardId').textContent = randomId;
                
                if (imageSrc) {
                    document.getElementById('idCardImage').setAttribute('src', imageSrc);
                    document.getElementById('idCardImage').style.display = 'block';
                    document.querySelector('.id-card-photo i').style.display = 'none';
                } else {
                    document.getElementById('idCardImage').setAttribute('src', '');
                    document.getElementById('idCardImage').style.display = 'none';
                    document.querySelector('.id-card-photo i').style.display = 'block';
                }
                
                // Show output container and hide form
                formContainer.style.display = 'none';
                outputContainer.style.display = 'block';
                
                // Show success message
                showAlert('ID Card generated successfully!', 'success');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // Back to form button
            backToForm.addEventListener('click', function() {
                outputContainer.style.display = 'none';
                formContainer.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // Alert message function
            function showAlert(message, type) {
                alertMessage.textContent = message;
                alertMessage.className = 'alert-message';
                
                if (type === 'success') {
                    alertMessage.classList.add('success');
                } else if (type === 'error') {
                    alertMessage.classList.add('error');
                }
                
                alertMessage.style.display = 'block';
                
                // Hide alert after 5 seconds
                setTimeout(function() {
                    alertMessage.style.display = 'none';
                }, 5000);
            }
            
            // PDF functionality
            const downloadPdf = document.getElementById('downloadPdf');
            const printPdf = document.getElementById('printPdf');
            
            downloadPdf.addEventListener('click', function() {
                const element = document.getElementById('idCard');
                const opt = {
                    margin: 10,
                    filename: 'id-card.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                html2pdf().set(opt).from(element).save();
            });
            
            printPdf.addEventListener('click', function() {
                window.print();
            });
        });