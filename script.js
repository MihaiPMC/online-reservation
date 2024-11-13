document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!name || !date || !time) {
            alert('Toate câmpurile sunt obligatorii!');
            return;
        }

        const reservation = {
            name,
            date,
            time,
            id: Date.now()
        };

        saveReservation(reservation);

        form.reset();
        alert('Rezervarea a fost înregistrată cu succes!');
    }

    function saveReservation(reservation) {
        let reservations = localStorage.getItem('reservations');
        reservations = reservations ? JSON.parse(reservations) : [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const reservationsList = document.getElementById('reservationsList');

    loadReservations();

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!name || !date || !time) {
            alert('Toate câmpurile sunt obligatorii!');
            return;
        }

        const reservation = {
            name,
            date,
            time,
            id: Date.now()
        };

        saveReservation(reservation);
        addReservationToList(reservation);

        bookingForm.reset();
        alert('Rezervarea a fost înregistrată cu succes!');
    });

    function saveReservation(reservation) {
        let reservations = localStorage.getItem('reservations');
        reservations = reservations ? JSON.parse(reservations) : [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }

    function loadReservations() {
        let reservations = localStorage.getItem('reservations');
        reservations = reservations ? JSON.parse(reservations) : [];
        reservations.forEach(reservation => {
            addReservationToList(reservation);
        });
    }

    function addReservationToList(reservation) {
        const reservationItem = document.createElement('li');
        reservationItem.textContent = `Nume: ${reservation.name}, Data: ${reservation.date}, Ora: ${reservation.time}`;
        reservationsList.appendChild(reservationItem);
    }
});