// Event data
        const events = [
            {
                id: "1",
                title: "Summer Music Festival 2026",
                date: "July 15, 2026",
                time: "18:00",
                location: "Cairo Festival City, New Cairo",
                venue: "Main Stage",
                category: "Music",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1675972418297-29d4e440d63b?w=500&auto=format",
                availableSeats: 2500,
                totalSeats: 3000,
                description: "Join us for an unforgettable evening of live music featuring top artists from around the world. Experience the magic of summer with great performances, food trucks, and an amazing atmosphere.",
                organizer: "LiveNation Events"
            },
            {
                id: "2",
                title: "Tech Innovation Conference",
                date: "April 22, 2026",
                time: "09:00",
                location: "Egypt International Exhibition Center, Cairo",
                venue: "Hall A",
                category: "Technology",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1600320261634-78edd477fa1e?w=500&auto=format",
                availableSeats: 800,
                totalSeats: 1000,
                description: "Discover the latest innovations in technology, AI, and digital transformation. Network with industry leaders and attend workshops led by top tech executives.",
                organizer: "TechWorld Inc"
            },
            {
                id: "3",
                title: "Food & Wine Expo",
                date: "May 10, 2026",
                time: "12:00",
                location: "Four Seasons Nile Plaza, Cairo",
                venue: "Exhibition Hall",
                category: "Food",
                price: 45.00,
                image: "https://images.unsplash.com/photo-1762455129210-c886b9295056?w=500&auto=format",
                availableSeats: 1200,
                totalSeats: 1500,
                description: "Experience a culinary journey featuring renowned chefs, wine tastings, and cooking demonstrations. Sample dishes from over 50 restaurants and wineries.",
                organizer: "Culinary Events Co"
            },
            {
                id: "4",
                title: "Marathon for Health",
                date: "June 5, 2026",
                time: "07:00",
                location: "Corniche, Alexandria",
                venue: "Starting Point: Stanley Bridge",
                category: "Sports",
                price: 35.00,
                image: "https://images.unsplash.com/photo-1760315972424-1637530daead?w=500&auto=format",
                availableSeats: 5000,
                totalSeats: 5000,
                description: "Participate in our annual marathon supporting health initiatives. Choose from 5K, 10K, or full marathon distances. All proceeds go to local health charities.",
                organizer: "Boston Running Club"
            },
            {
                id: "5",
                title: "Contemporary Art Exhibition",
                date: "April 18, 2026",
                time: "10:00",
                location: "Cairo Opera House, Zamalek",
                venue: "Gallery West",
                category: "Art",
                price: 25.00,
                image: "https://images.unsplash.com/photo-1723974591057-ccadada1f283?w=500&auto=format",
                availableSeats: 300,
                totalSeats: 400,
                description: "Explore stunning contemporary artworks from emerging and established artists. Interactive installations, guided tours, and artist meet-and-greets included.",
                organizer: "Modern Art Society"
            },
            {
                id: "6",
                title: "Comedy Night Live",
                date: "March 28, 2026",
                time: "20:00",
                location: "Al Azhar Park, Cairo",
                venue: "Main Theater",
                category: "Entertainment",
                price: 55.00,
                image: "https://images.unsplash.com/photo-1769761341012-526493327ac7?w=500&auto=format",
                availableSeats: 250,
                totalSeats: 350,
                description: "Laugh until you cry with performances from top stand-up comedians. An evening of non-stop entertainment perfect for a night out with friends.",
                organizer: "Comedy Central Live"
            },
            {
                id: "7",
                title: "Startup Pitch Competition",
                date: "May 20, 2026",
                time: "14:00",
                location: "Greek Campus, Downtown Cairo",
                venue: "Auditorium",
                category: "Business",
                price: 0,
                image: "https://images.unsplash.com/photo-1590098563686-06ab8778a6a7?w=500&auto=format",
                availableSeats: 400,
                totalSeats: 500,
                description: "Watch promising startups pitch their ideas to top investors. Network with entrepreneurs, VCs, and industry experts. Free admission, registration required.",
                organizer: "Austin Startups Network"
            },
            {
                id: "8",
                title: "Jazz Under The Stars",
                date: "August 12, 2026",
                time: "19:30",
                location: "Baron Palace Gardens, Heliopolis",
                venue: "Outdoor Amphitheater",
                category: "Music",
                price: 65.00,
                image: "https://images.unsplash.com/photo-1770399883774-4a5ca3e32a7d?w=500&auto=format",
                availableSeats: 600,
                totalSeats: 800,
                description: "Enjoy smooth jazz in a beautiful garden setting. Bring a blanket and picnic basket for a perfect summer evening. World-class jazz musicians performing classics and originals.",
                organizer: "Seattle Jazz Society"
            }
        ];

        // Bookings data (local storage)
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

        // State
        let currentCategory = 'All';
        let searchQuery = '';
        let currentEvent = null;

        // DOM elements
        const eventsGrid = document.getElementById('eventsGrid');
        const noEventsDiv = document.getElementById('noEvents');
        const eventsCountSpan = document.getElementById('eventsCount');
        const searchInput = document.getElementById('searchInput');
        const categoryBtns = document.querySelectorAll('.category-btn');
        const heroSection = document.getElementById('heroSection');
        const categoryBar = document.getElementById('categoryBar');
        const mainContent = document.getElementById('mainContent');
        const myBookingsSection = document.getElementById('myBookingsSection');
        const bookingsList = document.getElementById('bookingsList');
        const eventModal = document.getElementById('eventModal');
        const modalContent = document.getElementById('modalContent');

        // Check if almost full (less than 20% seats available)
        function isAlmostFull(available, total) {
            return (available / total) * 100 <= 20 && available > 0;
        }

        // Save bookings to localStorage
        function saveBookings() {
            localStorage.setItem('bookings', JSON.stringify(bookings));
        }

        // Show Home page
        window.showHome = function() {
            heroSection.style.display = 'block';
            categoryBar.style.display = 'block';
            mainContent.style.display = 'block';
            myBookingsSection.style.display = 'none';
            renderEvents();
        };

        // Show My Bookings page
        window.showMyBookings = function() {
            heroSection.style.display = 'none';
            categoryBar.style.display = 'none';
            mainContent.style.display = 'none';
            myBookingsSection.style.display = 'block';
            renderBookings();
        };
// Render bookings
function renderBookings() {
    if (bookings.length === 0) {
        bookingsList.innerHTML = `
            <div class="no-events">
                <i class="fas fa-ticket-alt"></i>
                <p>No bookings yet</p>
                <p style="margin-bottom: 1.5rem;">Start exploring and book your first event</p>
                <button class="btn btn-small" onclick="showHome()" style="padding: 0.5rem 1.5rem; font-size: 0.875rem; width: auto; display: inline-block;">Browse Events</button>
            </div>
        `;
        return;
    }

    // Sort bookings by date (most recent first)
    const sortedBookings = [...bookings].sort((a, b) => 
        new Date(b.bookingDate) - new Date(a.bookingDate)
    );

    bookingsList.innerHTML = sortedBookings.map(booking => {
        const eventDate = new Date(booking.eventDate);
        const isUpcoming = eventDate > new Date();
        
        return `
            <div class="booking-card">
                <div class="booking-header">
                    <h4>${booking.eventTitle}</h4>
                    <span class="booking-badge ${isUpcoming ? 'upcoming' : 'past'}">
                        ${isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                </div>
                <div class="booking-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${booking.eventDate} at ${booking.eventTime}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${booking.eventLocation}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ticket-alt"></i>
                        <span>${booking.numberOfTickets} ticket(s)</span>
                    </div>
                </div>
                <div class="booking-footer">
                    <div class="booking-total">
                        <span class="price">${booking.totalPrice === 0 ? 'Free' : '$' + booking.totalPrice.toFixed(2)}</span>
                        <span class="booking-id">${booking.id}</span>
                    </div>
                    <button class="btn-delete" onclick="deleteBooking('${booking.id}')" style="background-color: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; font-size: 0.875rem;">
                        <i class="fas fa-trash-alt" style="margin-right: 0.25rem;"></i>
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }).join('') + `
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-danger" onclick="resetBookings()" style="background-color: #ef4444; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">
                <i class="fas fa-trash-alt" style="margin-right: 0.5rem;"></i>
                Reset All Bookings
            </button>
        </div>
    `;
}

// Delete single booking
window.deleteBooking = function(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        bookings = bookings.filter(booking => booking.id !== bookingId);
        saveBookings();
        renderBookings();
        alert('Booking has been cancelled.');
    }
};
// Reset all bookings
window.resetBookings = function() {
    if (confirm('Are you sure you want to delete all bookings? This action cannot be undone.')) {
        bookings = [];
        saveBookings();
        renderBookings();
        alert('All bookings have been deleted.');
    }
};

        // Show event details modal
        window.showEventDetails = function(eventId) {
            const event = events.find(e => e.id === eventId);
            if (!event) return;
            
            currentEvent = event;
            const almostFull = isAlmostFull(event.availableSeats, event.totalSeats);
            
            modalContent.innerHTML = `
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${event.image}" alt="${event.title}">
                        <span class="card-badge">${event.category}</span>
                        ${event.price === 0 ? '<span class="badge-free">Free</span>' : ''}
                        ${almostFull ? '<span class="badge-almost-full">Almost Full</span>' : ''}
                    </div>
                    <div class="modal-info">
                        <h2>${event.title}</h2>
                        
                        <div class="event-details-full">
                            <div class="detail-item">
                                <i class="fas fa-calendar-alt"></i>
                                <div>
                                    <p class="detail-label">Date & Time</p>
                                    <p class="detail-value">${event.date} at ${event.time}</p>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <p class="detail-label">Location</p>
                                    <p class="detail-value">${event.location}</p>
                                    <p class="detail-sub">${event.venue}</p>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <i class="fas fa-dollar-sign"></i>
                                <div>
                                    <p class="detail-label">Ticket Price</p>
                                    <p class="detail-value price">${event.price === 0 ? 'Free' : '$' + event.price.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <i class="fas fa-users"></i>
                                <div>
                                    <p class="detail-label">Availability</p>
                                    <p class="detail-value">${event.availableSeats} / ${event.totalSeats} seats</p>
                                </div>
                            </div>
                            
                            <div class="detail-item">
                                <i class="fas fa-building"></i>
                                <div>
                                    <p class="detail-label">Organizer</p>
                                    <p class="detail-value">${event.organizer}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="event-description">
                            <h4>About This Event</h4>
                            <p>${event.description}</p>
                        </div>
                        
                        <div class="booking-form">
                            <h4>Book Your Tickets</h4>
                            ${event.availableSeats > 0 ? `
                                <form onsubmit="bookEvent(event)">
                                    <input type="hidden" name="eventId" value="${event.id}">
                                    
                                    <div class="form-group">
                                        <label>Full Name *</label>
                                        <input type="text" id="customerName" class="form-input" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Email Address *</label>
                                        <input type="email" id="customerEmail" class="form-input" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>Number of Tickets *</label>
                                        <input type="number" id="numberOfTickets" class="form-input" min="1" max="${Math.min(event.availableSeats, 10)}" value="1" required>
                                        <small class="form-hint">Maximum 10 tickets per booking</small>
                                    </div>
                                    
                                    <div class="price-breakdown">
                                        <div class="price-row">
                                            <span>Price per ticket</span>
                                            <span>${event.price === 0 ? 'Free' : '$' + event.price.toFixed(2)}</span>
                                        </div>
                                        <div class="price-row">
                                            <span>Number of tickets</span>
                                            <span id="ticketCount">1</span>
                                        </div>
                                        <div class="price-row total">
                                            <span>Total</span>
                                            <span id="totalPrice">${event.price === 0 ? 'Free' : '$' + event.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    <button type="submit" class="btn">Confirm Booking</button>
                                </form>
                            ` : `
                                <div class="sold-out">
                                    <i class="fas fa-users" style="font-size: 3rem; color: var(--muted-foreground);"></i>
                                    <p>This event is sold out</p>
                                    <button class="btn btn-outline" onclick="closeModal()">Close</button>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;

            // Add ticket count listener
            setTimeout(() => {
                const ticketsInput = document.getElementById('numberOfTickets');
                if (ticketsInput) {
                    ticketsInput.addEventListener('input', function() {
                        const count = parseInt(this.value) || 1;
                        document.getElementById('ticketCount').textContent = count;
                        const total = event.price * count;
                        document.getElementById('totalPrice').textContent = total === 0 ? 'Free' : '$' + total.toFixed(2);
                    });
                }
            }, 100);

            eventModal.style.display = 'block';
        };

        // Book event
        window.bookEvent = function(e) {
            e.preventDefault();
            
            const customerName = document.getElementById('customerName').value;
            const customerEmail = document.getElementById('customerEmail').value;
            const numberOfTickets = parseInt(document.getElementById('numberOfTickets').value);

            if (!customerName || !customerEmail) {
                alert('Please fill in all required fields');
                return;
            }

            if (numberOfTickets > currentEvent.availableSeats) {
                alert('Not enough tickets available');
                return;
            }

            const bookingId = 'BK' + Date.now();
            const booking = {
                id: bookingId,
                eventId: currentEvent.id,
                eventTitle: currentEvent.title,
                eventDate: currentEvent.date,
                eventTime: currentEvent.time,
                eventLocation: currentEvent.location,
                customerName,
                customerEmail,
                numberOfTickets,
                totalPrice: currentEvent.price * numberOfTickets,
                bookingDate: new Date().toISOString()
            };

            bookings.push(booking);
            saveBookings();
            
            alert('Booking confirmed! Check your email for details.');
            closeModal();
            showMyBookings();
        };

        // Close modal
        window.closeModal = function() {
            eventModal.style.display = 'none';
        };

        // Clear filters
        window.clearFilters = function() {
            searchQuery = '';
            searchInput.value = '';
            currentCategory = 'All';
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-category="All"]').classList.add('active');
            
            renderEvents();
        };

        // Render events
        function renderEvents() {
            const filtered = events.filter(event => {
                const matchesCategory = currentCategory === 'All' || event.category === currentCategory;
                const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     event.location.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            eventsCountSpan.textContent = `${filtered.length} ${filtered.length === 1 ? 'event' : 'events'} found`;

            if (filtered.length === 0) {
                eventsGrid.style.display = 'none';
                noEventsDiv.style.display = 'block';
                return;
            }

            eventsGrid.style.display = 'grid';
            noEventsDiv.style.display = 'none';

            eventsGrid.innerHTML = filtered.map(event => {
                const almostFull = isAlmostFull(event.availableSeats, event.totalSeats);
                
                return `
                    <div class="event-card" onclick="showEventDetails('${event.id}')">
                        <div class="card-image">
                            <img src="${event.image}" alt="${event.title}" loading="lazy">
                            <span class="card-badge">${event.category}</span>
                            ${event.price === 0 ? '<span class="badge-free">Free</span>' : ''}
                            ${almostFull ? '<span class="badge-almost-full">Almost Full</span>' : ''}
                        </div>
                        <div class="card-content">
                            <h4 class="card-title">${event.title}</h4>
                            <div class="event-details">
                                <div class="detail-item">
                                    <i class="fas fa-calendar-alt"></i>
                                    <span>${event.date} at ${event.time}</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>${event.location}</span>
                                </div>
                                <div class="price-section">
                                    <div class="price">
                                        <i class="fas fa-dollar-sign"></i>
                                        <span>${event.price === 0 ? 'Free' : '$' + event.price.toFixed(2)}</span>
                                    </div>
                                    <div class="seats-left">
                                        <i class="fas fa-users"></i>
                                        <span>${event.availableSeats} left</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn" onclick="event.stopPropagation(); showEventDetails('${event.id}')">View Details</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Handle category click
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.category;
                renderEvents();
            });
        });

        // Handle search input
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderEvents();
        });

        // Close modal when clicking outside
        window.onclick = function(e) {
            if (e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        };

        // Initial render
        renderEvents();