document.addEventListener('DOMContentLoaded', () => {
    const qrType = document.getElementById('qr-type');
    const textInput = document.getElementById('text-input');
    const wifiInput = document.getElementById('wifi-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCodeDiv = document.getElementById('qr-code');

    qrType.addEventListener('change', () => {
        if (qrType.value === 'wifi') {
            textInput.classList.add('hidden');
            wifiInput.classList.remove('hidden');
        } else {
            textInput.classList.remove('hidden');
            wifiInput.classList.add('hidden');
        }
    });

    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    function generateQRCode() {
        let qrData = '';
        
        if (qrType.value === 'wifi') {
            const ssid = document.getElementById('wifi-ssid').value;
            const password = document.getElementById('wifi-password').value;
            const encryption = document.getElementById('wifi-encryption').value;
            
            qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        } else {
            qrData = document.getElementById('qr-text').value;
        }

        if (!qrData) {
            alert('Bitte geben Sie Daten ein!');
            return;
        }

        qrCodeDiv.innerHTML = '';
        
        new QRCode(qrCodeDiv, {
            text: qrData,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadBtn.classList.remove('hidden');
    }

    function downloadQRCode() {
        const img = qrCodeDiv.querySelector('img');
        if (!img) return;

        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = img.src;
        link.click();
    }
}); 