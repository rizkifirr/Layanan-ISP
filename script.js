let currentInput = '';
let currentStep = 'initial';
let selectedTransaction = '';
let nomorTujuan = '';
let nominalPulsa = 0;
let autoTPList = ['085648373739'];

function pressKey(key) {
    if (currentStep === 'initial') {
        currentInput += key;
        document.getElementById('displayInput').value = currentInput;
    }
}

function handleCall() {
    if (currentStep === 'initial') {
        if (currentInput === '*858#') {
            showMenuScreen();
        } else {
            alert('Kode USSD tidak valid. Silakan masukkan *858#');
            resetForm();
        }
    } else {
        const menuInput = document.getElementById('menuInput').value;
        if (menuInput) {
            handleMenu(menuInput);
        } else {
            alert('Silakan masukkan pilihan Anda.');
        }
    }
}

function showMenuScreen() {
    currentStep = 'menu';
    const menuScreen = document.getElementById('menuScreen');
    menuScreen.innerHTML = `
        <div>
            <p>Mau iPhone 15Plus dr Saskia Chadwick?</p>
            <br>
            <p>Hub *500*117#</p>
            <p>1.Transfer Pulsa</p>
            <p>2.Minta Pulsa</p>
            <p>3.Auto TP</p>
            <p>4.Delete Auto TP</p>
            <p>5.List Auto TP</p>
            <p>6.Cek Kupon Undian TP</p>
        </div>
        <input type="text" id="menuInput" class="menu-input">
    `;
    menuScreen.classList.remove('hidden');
    document.getElementById('displayScreen').classList.add('hidden');
    document.getElementById('keypadContainer').classList.add('hidden');
    
    document.getElementById('menuInput').focus();
}

function handleMenu(choice) {
    switch (currentStep) {
        case 'menu':
            handleMainMenu(choice);
            break;
        case 'transfer_nomor':
            handleTransferNomor(choice);
            break;
        case 'transfer_nominal':
            handleTransferNominal(choice);
            break;
        case 'transfer_confirmation':
            handleTransferConfirmation(choice);
            break;
        case 'minta_pulsa_nomor':
            handleMintaPulsaNomor(choice);
            break;
        case 'minta_pulsa_nominal':
            handleMintaPulsaNominal(choice);
            break;
        case 'minta_pulsa_confirmation':
            handleMintaPulsaConfirmation(choice);
            break;
        case 'auto_tp_nomor':
            handleAutoTPNomor(choice);
            break;
        case 'auto_tp_confirmation':
            handleAutoTPConfirmation(choice);
            break;
        case 'delete_auto_tp_nomor':
            handleDeleteAutoTPNomor(choice);
            break;
        case 'delete_auto_tp_confirmation':
            handleDeleteAutoTPConfirmation(choice);
            break;
        case 'list_auto_tp':
        case 'cek_kupon':
            showMenuScreen();
            break;
        default:
            showMenuScreen();
            break;
    }
}

function handleMainMenu(choice) {
    switch (choice) {
        case '1':
            selectedTransaction = 'Transfer Pulsa';
            showTransferScreen();
            break;
        case '2':
            selectedTransaction = 'Minta Pulsa';
            showMintaPulsaScreen();
            break;
        case '3':
            selectedTransaction = 'Auto TP';
            showAutoTPScreen();
            break;
        case '4':
            selectedTransaction = 'Delete Auto TP';
            showDeleteAutoTPScreen();
            break;
        case '5':
            selectedTransaction = 'List Auto TP';
            showListAutoTPScreen();
            break;
        case '6':
            selectedTransaction = 'Cek Kupon Undian TP';
            showCekKuponScreen();
            break;
        default:
            alert('Pilihan tidak valid. Silakan coba lagi.');
            showMenuScreen();
            break;
    }
}

// Transfer Pulsa functions
function showTransferScreen() {
    updateMenuScreen('Masukkan nomor tujuan transfer pulsa:');
    currentStep = 'transfer_nomor';
}

function handleTransferNomor(nomor) {
    if (/^\d{10,12}$/.test(nomor)) {
        nomorTujuan = nomor;
        updateMenuScreen('Masukkan nominal pulsa yang akan ditransfer:');
        currentStep = 'transfer_nominal';
    } else {
        alert('Nomor tidak valid. Silakan masukkan nomor yang benar.');
    }
}

function handleTransferNominal(nominal) {
    if (/^\d+$/.test(nominal) && parseInt(nominal) > 0) {
        nominalPulsa = parseInt(nominal);
        showTransferConfirmationScreen();
    } else {
        alert('Nominal tidak valid. Silakan masukkan angka yang benar.');
    }
}

function showTransferConfirmationScreen() {
    updateMenuScreen(`<p>Konfirmasi Transfer Pulsa:</p>
    <p>Nomor Tujuan: </p>${nomorTujuan}
    <p>Nominal: Rp</p>${nominalPulsa}
    <br>
    <p>1. Konfirmasi</p>
    <p>2. Batal</p>`);
    currentStep = 'transfer_confirmation';
}

function handleTransferConfirmation(choice) {
    if (choice === '1') {
        updateMenuScreen(`Transfer pulsa berhasil!
        Rp${nominalPulsa} telah ditransfer ke ${nomorTujuan}.
        
        <p>Tekan OK untuk kembali ke menu utama.</p>`);
        currentStep = 'transfer_success';
    } else if (choice === '2') {
        showMenuScreen();
    } else {
        alert('Pilihan tidak valid. Silakan pilih 1 untuk konfirmasi atau 2 untuk batal.');
    }
}

// Minta Pulsa functions
function showMintaPulsaScreen() {
    updateMenuScreen('Masukkan nomor untuk minta pulsa:');
    currentStep = 'minta_pulsa_nomor';
}

function handleMintaPulsaNomor(nomor) {
    if (/^\d{10,12}$/.test(nomor)) {
        nomorTujuan = nomor;
        updateMenuScreen('Masukkan nominal pulsa yang diminta:');
        currentStep = 'minta_pulsa_nominal';
    } else {
        alert('Nomor tidak valid. Silakan masukkan nomor yang benar.');
    }
}

function handleMintaPulsaNominal(nominal) {
    if (/^\d+$/.test(nominal) && parseInt(nominal) > 0) {
        nominalPulsa = parseInt(nominal);
        showMintaPulsaConfirmationScreen();
    } else {
        alert('Nominal tidak valid. Silakan masukkan angka yang benar.');
    }
}

function showMintaPulsaConfirmationScreen() {
    updateMenuScreen(`Konfirmasi Minta Pulsa:
    Nomor Tujuan: ${nomorTujuan}
    Nominal: Rp${nominalPulsa}
    
    1. Konfirmasi
    2. Batal`);
    currentStep = 'minta_pulsa_confirmation';
}

function handleMintaPulsaConfirmation(choice) {
    if (choice === '1') {
        updateMenuScreen(`<p>Permintaan pulsa berhasil dikirim!</p>
        Permintaan Rp${nominalPulsa} telah dikirim ke ${nomorTujuan}.
        
        Tekan OK untuk kembali ke menu utama.`);
        currentStep = 'minta_pulsa_success';
    } else if (choice === '2') {
        showMenuScreen();
    } else {
        alert('Pilihan tidak valid. Silakan pilih 1 untuk konfirmasi atau 2 untuk batal.');
    }
}

// Auto TP functions
function showAutoTPScreen() {
    updateMenuScreen('Masukkan nomor untuk Auto TP:');
    currentStep = 'auto_tp_nomor';
}

function handleAutoTPNomor(nomor) {
    if (/^\d{10,12}$/.test(nomor)) {
        nomorTujuan = nomor;
        showAutoTPConfirmationScreen();
    } else {
        alert('Nomor tidak valid. Silakan masukkan nomor yang benar.');
    }
}

function showAutoTPConfirmationScreen() {
    updateMenuScreen(`Konfirmasi Auto TP:
    Nomor Tujuan: ${nomorTujuan}
    
    1. Konfirmasi
    2. Batal`);
    currentStep = 'auto_tp_confirmation';
}

function handleAutoTPConfirmation(choice) {
    if (choice === '1') {
        autoTPList.push(nomorTujuan);
        updateMenuScreen(`Auto TP berhasil ditambahkan!
        Nomor ${nomorTujuan} telah ditambahkan ke daftar Auto TP.
        
        Tekan OK untuk kembali ke menu utama.`);
        currentStep = 'auto_tp_success';
    } else if (choice === '2') {
        showMenuScreen();
    } else {
        alert('Pilihan tidak valid. Silakan pilih 1 untuk konfirmasi atau 2 untuk batal.');
    }
}

// Delete Auto TP functions
function showDeleteAutoTPScreen() {
    updateMenuScreen('Masukkan nomor untuk menghapus Auto TP:');
    currentStep = 'delete_auto_tp_nomor';
}

function handleDeleteAutoTPNomor(nomor) {
    if (/^\d{10,12}$/.test(nomor)) {
        nomorTujuan = nomor;
        showDeleteAutoTPConfirmationScreen();
    } else {
        alert('Nomor tidak valid. Silakan masukkan nomor yang benar.');
    }
}

function showDeleteAutoTPConfirmationScreen() {
    updateMenuScreen(`Konfirmasi Hapus Auto TP:
    Nomor Tujuan: ${nomorTujuan}
    
    1. Konfirmasi
    2. Batal`);
    currentStep = 'delete_auto_tp_confirmation';
}

function handleDeleteAutoTPConfirmation(choice) {
    if (choice === '1') {
        const index = autoTPList.indexOf(nomorTujuan);
        if (index > -1) {
            autoTPList.splice(index, 1);
            updateMenuScreen(`Auto TP berhasil dihapus!
            Nomor ${nomorTujuan} telah dihapus dari daftar Auto TP.
            
            Tekan OK untuk kembali ke menu utama.`);
        } else {
            updateMenuScreen(`Nomor ${nomorTujuan} tidak ditemukan dalam daftar Auto TP.
            
            Tekan OK untuk kembali ke menu utama.`);
        }
        currentStep = 'delete_auto_tp_success';
    } else if (choice === '2') {
        showMenuScreen();
    } else {
        alert('Pilihan tidak valid. Silakan pilih 1 untuk konfirmasi atau 2 untuk batal.');
    }
}

// List Auto TP function
function showListAutoTPScreen() {
    let listContent = 'Daftar Auto TP:\n';
    autoTPList.forEach((nomor, index) => {
        listContent += `${index + 1}. ${nomor}\n`;
    });
    listContent += '\nTekan OK untuk kembali ke menu utama.';
    updateMenuScreen(listContent);
    currentStep = 'list_auto_tp';
}

// Cek Kupon Undian TP function
function showCekKuponScreen() {
    const kuponNumber = 'KU' + Math.floor(Math.random() * 1000000000);
    updateMenuScreen(`Kupon Undian TP Anda: ${kuponNumber}
    
    Tekan OK untuk kembali ke menu utama.`);
    currentStep = 'cek_kupon';
}

function updateMenuScreen(content) {
    const menuScreen = document.getElementById('menuScreen');
    menuScreen.innerHTML = `
        <div>${content}</div>
        <input type="text" id="menuInput" class="menu-input">
    `;
    document.getElementById('menuInput').focus();
}

function cancelAction() {
    if (currentStep === 'initial') {
        resetForm();
    } else {
        showMenuScreen();
    }
}

function resetForm() {
    currentStep = 'initial';
    currentInput = '';
    selectedTransaction = '';
    nomorTujuan = '';
    nominalPulsa = 0;
    document.getElementById('displayInput').value = '';
    document.getElementById('displayScreen').classList.remove('hidden');
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('keypadContainer').classList.remove('hidden');
}

window.onload = resetForm;