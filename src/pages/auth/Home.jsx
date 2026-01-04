import React, { useEffect } from "react";
import { Container, Navbar, Nav, Button, Row, Col, Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../../assets/styles/landing.css"

const logoSrc = "/images/cohub-logo.png";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    // Hero entrance
    gsap.from(".hero-eyebrow", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power2.out",
    });

    gsap.from(".hero-heading", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".hero-sub", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: 0.35,
      ease: "power2.out",
    });

    gsap.from(".hero-ctas", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: 0.45,
      ease: "power2.out",
    });

    gsap.from(".hero-metadata", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: 0.55,
      ease: "power2.out",
    });

    // Hero card & orbs
    gsap.from(".hero-card", {
      x: 40,
      opacity: 0,
      duration: 0.9,
      delay: 0.35,
      ease: "power3.out",
    });

    gsap.to(".orb", {
      y: 30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.4,
    });

    // Features section
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: "#features",
        start: "top 75%",
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.15,
    });

    // Trust band
    gsap.from(".trust-band", {
      scrollTrigger: {
        trigger: "#trust",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="cohub-page min-vh-100 text-light animated-bg">
      {/* HERO */}
      <main>
        <Container style={{ maxWidth: 960 }} className="pt-5 pb-5">
          <section className="hero-section">
            <Row className="g-5 align-items-center">
              {/* Left */}
              <Col md={7}>
                <p className="hero-eyebrow text-uppercase mb-2">
                  Personal Task &amp; Project Hub
                </p>

                <h1 className="hero-heading display-5 fw-bold lh-sm">
                  Finally, get your to-do list <span className="text-sky">done</span>.
                </h1>

                <p className="hero-sub text-slate-200 mt-3 mb-4" style={{ maxWidth: 520 }}>
                  CoHub is the easiest way to capture tasks, switch between uni projects,
                  and actually finish what matters — without messy spreadsheets and sticky notes
                  everywhere.
                </p>

                <div className="hero-ctas d-flex flex-wrap gap-3 mb-4">
                  <Button as={Link} to="/register" className="cta-primary px-4 py-2 fw-semibold">
                    Start Organizing For Free{" "}
                    <Icon icon="mdi:arrow-right" className="ms-2" />
                  </Button>
                </div>

                <div className="hero-metadata d-flex flex-wrap gap-4 small text-slate-200">
                  <div className="d-flex align-items-center gap-2">
                    <span className="pulse-dot" />
                    <span>Live task dashboard · always synced</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Icon icon="mdi:check-circle-outline" className="text-emerald" />
                    <span>Perfect for uni projects &amp; personal goals</span>
                  </div>
                </div>
              </Col>

              {/* Right */}
              <Col md={5}>
                <div className="position-relative">
                  <div className="orb orb-1" />
                  <div className="orb orb-2" />

                  <div className="hero-card glass-panel border-slate-700 p-4 rounded-4 shadow-lg">
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <div>
                        <div className="text-slate-300 small mb-1">Today</div>
                        <div className="h5 fw-semibold mb-0">My Tasks Overview</div>
                      </div>

                      <Badge pill className="badge-ontrack">
                        <span className="dot-ontrack" /> On track
                      </Badge>
                    </div>

                    <Row className="g-2 mb-3" style={{ fontSize: 12 }}>
                      <Col xs={4}>
                        <Card className="mini-stat">
                          <Card.Body className="p-3">
                            <div className="text-slate-300 mb-1">In Progress</div>
                            <div className="h4 mb-0 text-sky fw-semibold">4</div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs={4}>
                        <Card className="mini-stat">
                          <Card.Body className="p-3">
                            <div className="text-slate-300 mb-1">Completed</div>
                            <div className="h4 mb-0 text-emerald fw-semibold">9</div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs={4}>
                        <Card className="mini-stat">
                          <Card.Body className="p-3">
                            <div className="text-slate-300 mb-1">Due Today</div>
                            <div className="h4 mb-0 text-rose fw-semibold">2</div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2" style={{ fontSize: 12 }}>
                      <div className="task-row bg-slate-800-60">
                        <div className="d-flex align-items-center gap-2">
                          <span className="task-box" />
                          <span className="text-slate-100">Finish research report</span>
                        </div>
                        <span className="pill pill-today">Today</span>
                      </div>

                      <div className="task-row bg-slate-800-40">
                        <div className="d-flex align-items-center gap-2">
                          <span className="task-check">
                            <Icon icon="mdi:check" fontSize={12} className="text-dark" />
                          </span>
                          <span className="text-slate-200 text-decoration-line-through">
                            Submit project proposal
                          </span>
                        </div>
                        <span className="pill pill-done">Done</span>
                      </div>

                      <div className="task-row bg-slate-800-50">
                        <div className="d-flex align-items-center gap-2">
                          <span className="task-box" />
                          <span className="text-slate-100">Plan next sprint tasks</span>
                        </div>
                        <span className="pill pill-focus">Focus</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </section>

          {/* FEATURES */}
          <section id="features" className="mt-5 pt-4">
            <div className="d-flex align-items-end justify-content-between mb-3">
              <div>
                <div className="text-uppercase small text-sky-200" style={{ letterSpacing: "0.2em" }}>
                  Why you’ll actually use it
                </div>
                <h2 className="h3 fw-semibold mt-2 mb-0">Built for busy students and makers.</h2>
              </div>

              <Button
                as={Link}
                to="/signup"
                variant="outline-light"
                className="d-none d-md-inline-flex rounded-pill px-4 feature-secondary-cta"
              >
                Start Organizing For Free
              </Button>
            </div>

            <Row className="g-3">
              <Col md={4}>
                <div className="feature-card card-surface p-4 rounded-4 border-slate-700">
                  <div className="icon-bubble icon-sky mb-3">
                    <Icon icon="mdi:cloud-sync-outline" fontSize={20} />
                  </div>
                  <h3 className="h6 fw-semibold">Stay synced across everything</h3>
                  <p className="text-slate-300 mb-0">
                    Capture tasks from any device and see the same clean dashboard when you log in —
                    no manual “syncing” or version confusion.
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="feature-card card-surface p-4 rounded-4 border-slate-700">
                  <div className="icon-bubble icon-emerald mb-3">
                    <Icon icon="mdi:flash-outline" fontSize={20} />
                  </div>
                  <h3 className="h6 fw-semibold">Input tasks in seconds</h3>
                  <p className="text-slate-300 mb-0">
                    Add tasks with clear priorities and due dates in a single panel, so you spend
                    time finishing work, not formatting it.
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="feature-card card-surface p-4 rounded-4 border-slate-700">
                  <div className="icon-bubble icon-amber mb-3">
                    <Icon icon="mdi:chart-timeline-variant" fontSize={20} />
                  </div>
                  <h3 className="h6 fw-semibold">Feel accomplished every day</h3>
                  <p className="text-slate-300 mb-0">
                    See your week’s stats and “Done” tasks at a glance. CoHub turns your progress
                    into motivation instead of stress.
                  </p>
                </div>
              </Col>
            </Row>

            <div className="mt-4 d-md-none text-center">
              <Button as={Link} to="/signup" variant="outline-light" className="rounded-pill px-4">
                Start Organizing For Free
              </Button>
            </div>
          </section>

          {/* TRUST */}
          <section id="trust" className="mt-5 pt-4">
            <div className="trust-band card-surface p-4 p-md-5 rounded-4 border-slate-700 d-flex flex-column flex-md-row gap-4 align-items-center">
              <div className="flex-grow-1">
                <div className="text-uppercase small text-sky-200" style={{ letterSpacing: "0.25em" }}>
                  Trusted by busy people
                </div>
                <h3 className="h4 fw-semibold mt-2">
                  CoHub helps students, developers, and creators stay on top of their chaos.
                </h3>
                <p className="text-slate-300 mb-0">
                  “Having my personal tasks and project tasks in one clean view makes it so much
                  easier to decide what to do next.”
                </p>
              </div>

              <div className="flex-grow-1 d-flex flex-column gap-3 align-items-md-end">
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-stack">
                    <span className="av av-1" />
                    <span className="av av-2" />
                    <span className="av av-3" />
                  </div>
                  <div className="text-slate-200">
                    Trusted by <span className="fw-semibold text-sky">1,500+</span> organized users.
                  </div>
                </div>

                <div className="d-flex gap-4 small text-slate-400">
                  <span className="d-flex align-items-center gap-1">
                    <Icon icon="mdi:shield-check-outline" />
                    No spam. No dark patterns.
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Icon icon="mdi:lock-outline" />
                    Your tasks stay yours.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ / FOOTER */}
          <section id="faq" className="mt-5 mb-4 pt-3">
            <Row className="g-4">
              <Col md={6}>
                <h4 className="h5 fw-semibold mb-3">FAQ / Help</h4>
                <ul className="list-unstyled d-grid gap-3 text-slate-300">
                  <li>
                    <span className="fw-medium text-slate-100">Do I have to pay?</span>
                    <br />
                    CoHub is built as a uni project and currently free to use.
                  </li>
                  <li>
                    <span className="fw-medium text-slate-100">Can I track different tasks?</span>
                    <br />
                    Yes. Switch between personal tasks in the task list dashboard.
                  </li>
                </ul>
              </Col>

              <Col md={6}>
                <h4 className="h5 fw-semibold mb-3">Contact &amp; Legal</h4>
                <div className="text-slate-300 d-grid gap-2">
                  <p className="mb-0">
                    <span className="fw-medium text-slate-100">Contact Us:</span>{" "}
                    <a href="mailto:support@cohub.app" className="text-sky-link">
                      support@cohub.app
                    </a>
                  </p>
                  <p className="mb-0">
                    <a href="#" className="text-slate-300 hover-sky">
                      Terms of Service
                    </a>{" "}
                    ·{" "}
                    <a href="#" className="text-slate-300 hover-sky">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </Col>
            </Row>

            <div className="mt-4 pt-3 border-top border-slate-700 text-center small text-slate-400">
              &copy; {year} CoHub. Built as a university project and productivity playground.
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}

module.exports = LandingPage