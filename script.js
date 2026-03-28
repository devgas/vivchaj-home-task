function initModal() {
    document.querySelectorAll('[data-target]').forEach(openBtn => {
        openBtn.addEventListener('click', () => {
            const overlay = document.querySelector(openBtn.dataset.target);
            openModal(overlay);
        });
    });

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const overlay = btn.closest('.modal-overlay');
            closeModal(overlay);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(closeModal);
        }
    });
}

function openModal(overlay) {
    overlay.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeModal(overlay) {
    overlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function initDropdown() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }

        if (e.key === 'Enter' && e.target.classList.contains('dropdown-toggle')) {
            handleDropdownClick(e.target);
        }
    });

    toggleDropdown();
}

function toggleDropdown() {
    const toggleBtn = document.querySelectorAll('.dropdown-toggle');

    toggleBtn.forEach(toggle => {
       handleDropdownClick(toggle);
    });
}

function handleDropdownClick(dropdown)
{
    dropdown.addEventListener('click', (e) => {
        const currentDropdownMenu = e.target.closest('.dropdown').querySelector('.dropdown-menu');
        currentDropdownMenu.classList.toggle('open');
        closeAllDropdowns(currentDropdownMenu);
    });
}

function closeAllDropdowns(except) {
    const allDropdownMenus = document.querySelectorAll('.dropdown-menu');

    allDropdownMenus.forEach(dd => {
        if (dd !== except) {
            dd.classList.remove('open');
        }
    });
}

function confirmDialog(message) {
    return new Promise((resolve) => {
        const overlay = document.querySelector('#confirm-modal');
        const confirmBtn = overlay.querySelector('.btn-confirm');
        const cancelBtn = overlay.querySelector('.btn-cancel');

        overlay.querySelector('.confirm-message').textContent = message;
        openModal(overlay);

        confirmBtn.addEventListener('click', () => {
            resolve(true);
            closeModal(overlay);
        }, { once: true });

        cancelBtn.addEventListener('click', () => {
            resolve(false);
            closeModal(overlay);
        }, { once: true });
    });
}

function initConfirmDialog() {
    document.querySelector('.btn-open-confirm-dialog').addEventListener('click', async () => {
        const result = await confirmDialog('Ти впевнений?');
        if (result) {
            console.log('Користувач підтвердив');
        } else {
            console.log('Користувач скасував');
        }
    });
}

document.addEventListener('DOMContentLoaded', initModal);
document.addEventListener('DOMContentLoaded', initDropdown);
document.addEventListener('DOMContentLoaded', initConfirmDialog);


