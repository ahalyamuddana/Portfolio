/**
 * MUDDANA AHALYA - PORTFOLIO INTERACTION ENGINE
 * Handles mouse tracking blob, dynamic typewriter, scroll reveal,
 * modal popups, category filters, and contact interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMouseBlob();
    initTypewriter();
    initScrollReveal();
    initNavbarScroll();
    initActiveNav();
    initMobileNav();
    initProjectFilters();
    initBackToTop();
});

/* ==========================================================================
   1. Interactive Mouse Tracking Ambient Blob
   ========================================================================== */
function initMouseBlob() {
    const blob = document.getElementById('blob');
    if (!blob) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;

    window.addEventListener('pointermove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth physics interpolation for fluid cursor following
    function animateBlob() {
        blobX += (mouseX - blobX) * 0.08;
        blobY += (mouseY - blobY) * 0.08;
        blob.style.left = `${blobX}px`;
        blob.style.top = `${blobY}px`;
        requestAnimationFrame(animateBlob);
    }
    requestAnimationFrame(animateBlob);
}

/* ==========================================================================
   2. Typewriter Effect for Title
   ========================================================================== */
function initTypewriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const textToType = "Python Full Stack Developer";
    typingElement.textContent = "";
    let charIndex = 0;
    const typingSpeed = 80;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typingElement.textContent = textToType.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    setTimeout(typeWriter, 400);
}

/* ==========================================================================
   3. Intersection Observer for Scroll Reveals
   ========================================================================== */
function initScrollReveal() {
    const hiddenElements = document.querySelectorAll('.hidden');
    if (!hiddenElements.length) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Keep showing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    hiddenElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. Navbar Scroll State & Shadow
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   5. Active Navigation Link on Scroll
   ========================================================================== */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   6. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!toggleBtn || !drawer) return;

    function toggleMenu() {
        toggleBtn.classList.toggle('active');
        drawer.classList.toggle('open');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    }

    function closeMenu() {
        toggleBtn.classList.remove('active');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeMenu();
        }
    });
}

/* ==========================================================================
   7. Project Category Filters
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   9. Deep-Dive Project Modal Data & Controller
   ========================================================================== */
const projectModalData = {
    'soil-project': {
        badge: 'IoT & Precision Agriculture Telemetry',
        title: 'Smart Soil Nutrient and Moisture Monitoring System',
        period: 'January 2026 – May 2026',
        overview: 'An integrated IoT edge-to-cloud ecosystem engineered to monitor real-time agricultural soil conditions and provide dynamic agronomic guidance.',
        details: [
            {
                title: 'Sensor & Hardware Interfacing',
                content: 'Interfaced industrial Modbus RS485 NPK (Nitrogen, Phosphorus, Potassium) soil sensors and capacitive moisture sensors with Arduino UNO microcontrollers. Converted serial RS485 differential signals into decoded ASCII telemetry streams.'
            },
            {
                title: 'Backend & ML Inference Pipeline',
                content: 'Engineered a Node.js and Express server that ingests live serial packets, sanitizes sensor drift values, and feeds live parameters into a custom Python Scikit-Learn Decision Tree classification model.'
            },
            {
                title: 'Recommendation Engine & Dashboard',
                content: 'Formulated real-time, hourly, and daily crop suitability recommendations based on NPK proportions and soil moisture levels. Visualized trends dynamically using Chart.js with automated CSV logging for agronomist data export.'
            }
        ],
        techStack: ['Arduino UNO', 'Modbus RS485', 'Node.js', 'Express.js', 'Python', 'Scikit-Learn', 'Decision Trees', 'Chart.js', 'Serial Communication']
    },
    'vectorium-project': {
        badge: 'Medical Deep Learning & Computer Vision',
        title: 'VecTorium: Hybrid Deep Learning Ensemble for Brain Tumor Classification',
        period: 'October 2025 – November 2025',
        overview: 'A high-precision biomedical image classification architecture combining multiple CNN feature extractors to detect 4 distinct MRI brain tumor classes.',
        details: [
            {
                title: 'Multi-Backbone Feature Concatenation',
                content: 'VecTorium integrates three frozen pre-trained CNN backbones: EfficientNetB3, ResNet50, and VGG16. Extracted dense feature representations are pooled via GlobalAveragePooling2D and concatenated into a fused dense classification head.'
            },
            {
                title: 'Optimization & Overfitting Prevention',
                content: 'Employed comprehensive image preprocessing and online data augmentation using Keras ImageDataGenerator. Integrated ReduceLROnPlateau dynamic learning rate decay and EarlyStopping callbacks to ensure optimal convergence without overfitting.'
            },
            {
                title: 'Empirical Metrics & Validation',
                content: 'Evaluated the model rigorously across 4-class MRI scans, achieving a peak 96.73% validation accuracy and 99.49% training accuracy, verified via confusion matrices, precision-recall curves, and multi-class classification reports.'
            }
        ],
        techStack: ['Python', 'TensorFlow', 'Keras', 'EfficientNetB3', 'ResNet50', 'VGG16', 'OpenCV', 'Scikit-Learn', 'NumPy', 'Matplotlib']
    }
};

function openProjectModal(projectId) {
    const data = projectModalData[projectId];
    if (!data) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <span class="modal-header-badge">${data.badge}</span>
        <h2 class="modal-title">${data.title}</h2>
        <p style="color: var(--accent-cyan); font-size: 0.9rem; margin-bottom: 16px;">
            <i class="fa-regular fa-calendar-days"></i> ${data.period}
        </p>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">
            ${data.overview}
        </p>

        <h3 class="modal-section-title"><i class="fa-solid fa-gears"></i> Key Engineering Details</h3>
        <ul class="modal-list">
            ${data.details.map(d => `
                <li>
                    <i class="fa-solid fa-circle-check"></i>
                    <div>
                        <strong style="color: #ffffff; display: block; margin-bottom: 4px;">${d.title}</strong>
                        <span>${d.content}</span>
                    </div>
                </li>
            `).join('')}
        </ul>

        <h3 class="modal-section-title"><i class="fa-solid fa-cubes"></i> Technologies Applied</h3>
        <div class="tech-stack-pills" style="margin-top: 10px;">
            ${data.techStack.map(t => `<span>${t}</span>`).join('')}
        </div>

        <div style="margin-top: 28px; display: flex; justify-content: flex-end; gap: 12px;">
            <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
            <a href="#contact" class="btn btn-primary" onclick="closeProjectModal()">
                <span>Discuss Project</span>
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

/* ==========================================================================
   10. Clipboard Copy Utility with Toast
   ========================================================================== */
function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Copied "${text}" to clipboard!`);
        
        if (btnElement) {
            const originalIcon = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
            setTimeout(() => {
                btnElement.innerHTML = originalIcon;
            }, 2000);
        }
    }).catch(err => {
        showToast(`<i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i> Could not copy text`);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerHTML = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* ==========================================================================
   11. Contact Form Interaction
   ========================================================================== */
function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Please complete all required fields.';
        return;
    }

    // Button loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
        submitBtn.style.background = '#10b981';

        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your inquiry has been queued. Ahalya will respond promptly.`;

        showToast('<i class="fa-solid fa-paper-plane" style="color: #00f0ff;"></i> Message sent successfully!');
        form.reset();

        setTimeout(() => {
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
            submitBtn.style.background = '';
            feedback.textContent = '';
        }, 5000);
    }, 1200);
}

/* ==========================================================================
   12. Interactive Project Simulators (IoT & Deep Learning)
   ========================================================================== */
function openDemoModal(demoType) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    if (demoType === 'soil-demo') {
        modalBody.innerHTML = `
            <span class="modal-header-badge"><i class="fa-solid fa-sliders"></i> Live Interactive Simulator</span>
            <h2 class="modal-title">IoT Soil Telemetry & Crop Recommender</h2>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">
                Adjust telemetry inputs simulating Modbus RS485 NPK sensors and soil moisture probes. The simulated Scikit-Learn Decision Tree model will predict the optimal crop suitability in real time.
            </p>

            <div class="sim-controls-grid">
                <div class="sim-slider-group">
                    <div class="sim-slider-header">
                        <span><i class="fa-solid fa-flask" style="color: #38bdf8;"></i> Nitrogen (N)</span>
                        <span class="sim-val-badge" id="n-val">65 mg/kg</span>
                    </div>
                    <input type="range" class="sim-slider" id="n-slider" min="10" max="140" value="65" oninput="updateSoilSim()">
                </div>

                <div class="sim-slider-group">
                    <div class="sim-slider-header">
                        <span><i class="fa-solid fa-vial" style="color: #4ade80;"></i> Phosphorus (P)</span>
                        <span class="sim-val-badge" id="p-val">50 mg/kg</span>
                    </div>
                    <input type="range" class="sim-slider" id="p-slider" min="10" max="140" value="50" oninput="updateSoilSim()">
                </div>

                <div class="sim-slider-group">
                    <div class="sim-slider-header">
                        <span><i class="fa-solid fa-fire-flame-simple" style="color: #fbbf24;"></i> Potassium (K)</span>
                        <span class="sim-val-badge" id="k-val">80 mg/kg</span>
                    </div>
                    <input type="range" class="sim-slider" id="k-slider" min="10" max="140" value="80" oninput="updateSoilSim()">
                </div>

                <div class="sim-slider-group">
                    <div class="sim-slider-header">
                        <span><i class="fa-solid fa-droplet" style="color: #00f0ff;"></i> Soil Moisture</span>
                        <span class="sim-val-badge" id="m-val">60%</span>
                    </div>
                    <input type="range" class="sim-slider" id="m-slider" min="10" max="100" value="60" oninput="updateSoilSim()">
                </div>
            </div>

            <div class="sim-result-box" id="soil-result-box">
                <div>
                    <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); display: block;">Decision Tree Model Prediction</span>
                    <span class="sim-result-badge" id="predicted-crop">🌽 Corn (Maize)</span>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Suitability Index</span>
                    <span style="color: var(--accent-cyan); font-weight: 700; font-size: 1.1rem;" id="suitability-score">96.4% Match</span>
                </div>
            </div>

            <p id="crop-recommendation-note" style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 14px; line-height: 1.5;">
                <strong>Agronomic Advisory:</strong> Balanced nitrogen and moisture parameters detected. Ideal for warm season cultivation.
            </p>

            <div style="margin-top: 26px; display: flex; justify-content: flex-end; gap: 12px;">
                <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
                <button class="btn btn-primary" onclick="openProjectModal('soil-project')">
                    <i class="fa-solid fa-circle-info"></i> Full Architecture
                </button>
            </div>
        `;
    } else if (demoType === 'vectorium-demo') {
        modalBody.innerHTML = `
            <span class="modal-header-badge" style="background: rgba(157, 78, 221, 0.15); color: #c084fc;">
                <i class="fa-solid fa-brain"></i> Neural Ensemble Inference
            </span>
            <h2 class="modal-title">VecTorium MRI Classifier Tester</h2>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                Select a simulated MRI brain scan test case. VecTorium fuses feature maps from EfficientNetB3, ResNet50, and VGG16 with GlobalAveragePooling2D to generate 4-class diagnostic probabilities.
            </p>

            <label style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Select MRI Case:</label>
            <div class="mri-case-selector">
                <button class="mri-case-btn active" onclick="selectMriCase('glioma', this)">1. Glioma MRI</button>
                <button class="mri-case-btn" onclick="selectMriCase('meningioma', this)">2. Meningioma</button>
                <button class="mri-case-btn" onclick="selectMriCase('pituitary', this)">3. Pituitary</button>
                <button class="mri-case-btn" onclick="selectMriCase('normal', this)">4. No Tumor</button>
            </div>

            <div style="margin: 18px 0; text-align: center;">
                <button class="sim-run-btn" id="run-vectorium-btn" onclick="runVectoriumInference()">
                    <i class="fa-solid fa-microchip"></i> Run Ensemble Inference
                </button>
            </div>

            <div class="confidence-bar-wrap" id="vectorium-bars">
                <div class="conf-bar-item">
                    <div class="conf-bar-header">
                        <span>Glioblastoma / Glioma</span>
                        <strong style="color: #34d399;" id="conf-glioma">96.7%</strong>
                    </div>
                    <div class="conf-track"><div class="conf-fill" id="fill-glioma" style="width: 96.7%;"></div></div>
                </div>

                <div class="conf-bar-item">
                    <div class="conf-bar-header">
                        <span>Meningioma</span>
                        <span id="conf-meningioma">2.1%</span>
                    </div>
                    <div class="conf-track"><div class="conf-fill" id="fill-meningioma" style="width: 2.1%; background: #64748b;"></div></div>
                </div>

                <div class="conf-bar-item">
                    <div class="conf-bar-header">
                        <span>Pituitary Tumor</span>
                        <span id="conf-pituitary">0.8%</span>
                    </div>
                    <div class="conf-track"><div class="conf-fill" id="fill-pituitary" style="width: 0.8%; background: #64748b;"></div></div>
                </div>

                <div class="conf-bar-item">
                    <div class="conf-bar-header">
                        <span>No Tumor (Healthy)</span>
                        <span id="conf-normal">0.4%</span>
                    </div>
                    <div class="conf-track"><div class="conf-fill" id="fill-normal" style="width: 0.4%; background: #64748b;"></div></div>
                </div>
            </div>

            <div style="margin-top: 26px; display: flex; justify-content: flex-end; gap: 12px;">
                <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
                <button class="btn btn-primary" onclick="openProjectModal('vectorium-project')">
                    <i class="fa-solid fa-circle-info"></i> Full Architecture
                </button>
            </div>
        `;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateSoilSim() {
    const n = parseInt(document.getElementById('n-slider').value);
    const p = parseInt(document.getElementById('p-slider').value);
    const k = parseInt(document.getElementById('k-slider').value);
    const m = parseInt(document.getElementById('m-slider').value);

    document.getElementById('n-val').textContent = `${n} mg/kg`;
    document.getElementById('p-val').textContent = `${p} mg/kg`;
    document.getElementById('k-val').textContent = `${k} mg/kg`;
    document.getElementById('m-val').textContent = `${m}%`;

    let predictedCrop = '🌽 Corn (Maize)';
    let score = '96.2%';
    let advisory = 'Balanced nutrients and adequate moisture. Excellent soil health for staple cereal crops.';

    if (m >= 75 && n >= 70) {
        predictedCrop = '🌾 Rice (Paddy)';
        score = '98.4%';
        advisory = 'High soil moisture & elevated nitrogen profile. Ideal wetland environment for paddy cultivation.';
    } else if (n >= 85 && p >= 65 && k >= 70) {
        predictedCrop = '☁️ Cotton';
        score = '95.1%';
        advisory = 'High nutrient retention with moderate moisture. Optimum condition for high-yield cotton crops.';
    } else if (n < 45 && p >= 55) {
        predictedCrop = '🌱 Legumes / Pulses';
        score = '94.7%';
        advisory = 'Low nitrogen with high phosphorus. Perfect for nitrogen-fixing pulse crops to enrich field soil naturally.';
    } else if (k >= 90 && m <= 50) {
        predictedCrop = '🍊 Citrus & Orchard Fruits';
        score = '93.8%';
        advisory = 'Rich potassium levels with well-drained low moisture. Prevents root rot and optimizes fruit sugar brix.';
    } else if (n >= 55 && m < 60) {
        predictedCrop = '🌾 Wheat';
        score = '96.5%';
        advisory = 'Moderate moisture and steady nitrogen. Well suited for rabi season wheat rotation.';
    }

    document.getElementById('predicted-crop').textContent = predictedCrop;
    document.getElementById('suitability-score').textContent = `${score} Match`;
    document.getElementById('crop-recommendation-note').innerHTML = `<strong>Agronomic Advisory:</strong> ${advisory}`;
}

let activeMriCase = 'glioma';
function selectMriCase(caseName, btn) {
    activeMriCase = caseName;
    document.querySelectorAll('.mri-case-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    runVectoriumInference();
}

function runVectoriumInference() {
    const btn = document.getElementById('run-vectorium-btn');
    if (!btn) return;

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Concatenating Features...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Inference Complete';
        btn.disabled = false;

        let g = 1.2, m = 1.1, p = 0.9, n = 0.5;
        if (activeMriCase === 'glioma') {
            g = 97.4; m = 1.4; p = 0.8; n = 0.4;
        } else if (activeMriCase === 'meningioma') {
            m = 96.2; g = 2.1; p = 1.1; n = 0.6;
        } else if (activeMriCase === 'pituitary') {
            p = 95.8; g = 1.5; m = 1.9; n = 0.8;
        } else if (activeMriCase === 'normal') {
            n = 99.1; g = 0.3; m = 0.4; p = 0.2;
        }

        const cases = [
            { id: 'glioma', val: g },
            { id: 'meningioma', val: m },
            { id: 'pituitary', val: p },
            { id: 'normal', val: n }
        ];

        cases.forEach(c => {
            const label = document.getElementById(`conf-${c.id}`);
            const fill = document.getElementById(`fill-${c.id}`);
            if (label && fill) {
                label.textContent = `${c.val}%`;
                fill.style.width = `${c.val}%`;
                if (c.val > 50) {
                    fill.style.background = 'linear-gradient(90deg, #10b981, #00f0ff)';
                    label.style.color = '#34d399';
                    label.style.fontWeight = '700';
                } else {
                    fill.style.background = '#475569';
                    label.style.color = '#94a3b8';
                    label.style.fontWeight = '400';
                }
            }
        });

        showToast('<i class="fa-solid fa-check" style="color: #10b981;"></i> Ensemble inference complete (96.7% accuracy backbone)!');
    }, 700);
}
