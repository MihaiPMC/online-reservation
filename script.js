document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!name || !date || !time) {
            alert('All fields are required!');
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
        alert('The reservation has been successfully recorded!');
    }

    function saveReservation(reservation) {
        let reservations = localStorage.getItem('reservations');
        reservations = reservations ? JSON.parse(reservations) : [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const addRestaurantForm = document.getElementById('addRestaurantForm');
    const bookingForm = document.getElementById('bookingForm');
    const restaurantSelect = document.getElementById('restaurant');
    const reservationsList = document.getElementById('reservationsList');
    const clearDatabaseButton = document.getElementById('clearDatabase');

    let restaurants = loadRestaurants();

    addRestaurantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const restaurantName = document.getElementById('restaurantName').value;
        const menu = document.getElementById('menu').value;
        const capacity = 20; // Set the daily capacity to 20

        const restaurant = {
            name: restaurantName,
            menu: menu,
            capacity: capacity,
            originalCapacity: capacity
        };

        restaurants.push(restaurant);
        saveRestaurants(restaurants);
        updateRestaurantSelect();
        addRestaurantForm.reset();
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const restaurantIndex = restaurantSelect.value;
        const restaurant = restaurants[restaurantIndex];
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const people = parseInt(document.getElementById('people').value, 10);

        if (people > restaurant.capacity) {
            alert('Not enough capacity for this reservation!');
            return;
        }

        restaurant.capacity -= people;
        saveRestaurants(restaurants);

        const reservation = {
            restaurant: restaurant.name,
            name: name,
            date: date,
            time: time,
            people: people
        };

        saveReservation(reservation);
        addReservationToList(reservation);
        bookingForm.reset();
    });

    clearDatabaseButton.addEventListener('click', () => {
        localStorage.clear();
        restaurants = [];
        updateRestaurantSelect();
        reservationsList.innerHTML = '';
        alert('The local database has been cleared.');
    });

    function updateRestaurantSelect() {
        restaurantSelect.innerHTML = '';
        restaurants.forEach((restaurant, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${restaurant.name} (Capacity: ${restaurant.capacity})`;
            restaurantSelect.appendChild(option);
        });
    }

    function saveRestaurants(restaurants) {
        localStorage.setItem('restaurants', JSON.stringify(restaurants));
    }

    function loadRestaurants() {
        let restaurants = localStorage.getItem('restaurants');
        return restaurants ? JSON.parse(restaurants) : [];
    }

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
        const li = document.createElement('li');
        li.textContent = `${reservation.name} - ${reservation.restaurant} - ${reservation.date} - ${reservation.time} - ${reservation.people} people`;
        reservationsList.appendChild(li);
    }

    function resetRestaurantCapacities() {
        restaurants.forEach(restaurant => {
            restaurant.capacity = 20; // Reset capacity to 20
        });
        saveRestaurants(restaurants);
        updateRestaurantSelect();
    }

    function checkForMidnight() {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            resetRestaurantCapacities();
        }
    }

    // Check every minute
    setInterval(checkForMidnight, 60000);

    // Initial load
    updateRestaurantSelect();
    loadReservations();
});