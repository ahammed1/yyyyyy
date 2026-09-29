import {
  ArrowRight,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Users,
} from "lucide-react";
function Home() {
  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            THE FUTURE OF COMMERCE
          </div>

          <h1>
            Turn your idea
            <br />
            into a <span>business.</span>
          </h1>

          <p className="hero-description">
            Everything you need to start, grow, market,
            and manage your business — all in one place.
          </p>

          <div className="hero-form">

            <input
              id="hero-email"
              name="email"
              type="email"
              autoComplete="email"
              aria-label="Email address"
              placeholder="Enter your email address"
            />

            <button>
              Start free trial
              <ArrowRight size={18} />
            </button>

          </div>

          <p className="trial-text">
            Try it free. No credit card required.
          </p>

        </div>


        {/* FLOATING CARDS */}

        <div className="floating-card card-one">

          <div className="card-icon">
            🛍️
          </div>

          <div>
            <strong>Online Store</strong>
            <p>Live & growing</p>
          </div>

        </div>


        <div className="floating-card card-two">

          <div className="sales-number">
            ₹24,580
          </div>

          <p>Today's sales</p>

          <span>
            +18.4%
          </span>

        </div>


        <div className="floating-card card-three">

          <div className="product-image">
            👟
          </div>

          <div>
            <strong>New Product</strong>
            <p>24 orders today</p>
          </div>

        </div>

      </section>


      {/* FEATURES SECTION */}

      <section className="features-section">

        <div className="section-heading">

          <p className="section-label">
            ONE PLATFORM
          </p>

          <h2>
            Everything you need
            <br />
            <span>to sell online.</span>
          </h2>

          <p className="section-description">
            From your first product to your millionth sale,
            manage your entire business from one powerful platform.
          </p>

        </div>


        <div className="feature-grid">

          {/* CARD 1 */}

          <div className="feature-card">

            <div className="feature-icon">
              <ShoppingBag size={25} />
            </div>

            <h3>
              Build your store
            </h3>

            <p>
              Create a beautiful online store without
              needing to be a designer or developer.
            </p>

            <a href="#">
              Explore stores
              <ArrowRight size={16} />
            </a>

          </div>


          {/* CARD 2 */}

          <div className="feature-card">

            <div className="feature-icon">
              <CreditCard size={25} />
            </div>

            <h3>
              Accept payments
            </h3>

            <p>
              Give your customers a simple and secure
              way to pay from anywhere in the world.
            </p>

            <a href="#">
              Explore payments
              <ArrowRight size={16} />
            </a>

          </div>


          {/* CARD 3 */}

          <div className="feature-card">

            <div className="feature-icon">
              <BarChart3 size={25} />
            </div>

            <h3>
              Grow your business
            </h3>

            <p>
              Understand your customers and use powerful
              analytics to make better decisions.
            </p>

            <a href="#">
              View analytics
              <ArrowRight size={16} />
            </a>

          </div>


          {/* CARD 4 */}

          <div className="feature-card">

            <div className="feature-icon">
              <Users size={25} />
            </div>

            <h3>
              Manage customers
            </h3>

            <p>
              Build relationships with customers and
              turn first-time buyers into loyal fans.
            </p>

            <a href="#">
              Learn more
              <ArrowRight size={16} />
            </a>

          </div>

        </div>

      </section>
      {/* STORE SHOWCASE */}

      <section className="store-section">

        <div className="store-text">

          <p className="section-label">
            YOUR ONLINE STORE
          </p>

          <h2>
            Build a store
            <br />
            <span>that feels like you.</span>
          </h2>

          <p>
            Create a professional storefront that reflects
            your brand. Customize every detail and give your
            customers a shopping experience they remember.
          </p>

          <a href="#" className="store-link">
            Explore online stores
            <ArrowRight size={17} />
          </a>

        </div>


        {/* STORE MOCKUP */}

        <div className="store-preview">

          <div className="browser-bar">

            <div className="browser-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="browser-address">
              yourstore.com
            </div>

          </div>


          <div className="store-content">

            <div className="store-nav">

              <strong>
                AURA
              </strong>

              <div>
                Home &nbsp;&nbsp; Shop &nbsp;&nbsp; About &nbsp;&nbsp; Contact
              </div>

              <div>
                🛒
              </div>

            </div>


            <div className="store-hero">

              <div>

                <p>
                  NEW COLLECTION
                </p>

                <h3>
                  Designed for
                  <br />
                  everyday living.
                </h3>

                <button>
                  Shop collection
                  <ArrowRight size={16} />
                </button>

              </div>

              <div className="store-product">
                👜
              </div>

            </div>


            <div className="store-products">

              <div>
                <div className="product-box">
                  👟
                </div>
                <strong>Urban Runner</strong>
                <p>₹4,999</p>
              </div>

              <div>
                <div className="product-box">
                  👜
                </div>
                <strong>Classic Bag</strong>
                <p>₹3,499</p>
              </div>

              <div>
                <div className="product-box">
                  ⌚
                </div>
                <strong>Minimal Watch</strong>
                <p>₹6,999</p>
              </div>

            </div>

          </div>

        </div>

      </section>
      {/* SELL EVERYWHERE */}

      <section className="sell-section">

        <div className="sell-heading">

          <p className="section-label">
            SELL EVERYWHERE
          </p>

          <h2>
            Meet your customers
            <br />
            <span>wherever they are.</span>
          </h2>

          <p>
            Sell online, in person, through social media,
            and across the world — all from one platform.
          </p>

        </div>


        <div className="sell-layout">

          {/* LEFT CHANNELS */}

          <div className="sell-channels">

            <div className="channel active-channel">

              <div className="channel-number">
                01
              </div>

              <div>
                <h3>Online store</h3>

                <p>
                  Build a storefront that works 24/7.
                </p>
              </div>

              <ArrowRight size={20} />

            </div>


            <div className="channel">

              <div className="channel-number">
                02
              </div>

              <div>
                <h3>Social commerce</h3>

                <p>
                  Turn followers into customers.
                </p>
              </div>

              <ArrowRight size={20} />

            </div>


            <div className="channel">

              <div className="channel-number">
                03
              </div>

              <div>
                <h3>In-person selling</h3>

                <p>
                  Sell anywhere with simple tools.
                </p>
              </div>

              <ArrowRight size={20} />

            </div>


            <div className="channel">

              <div className="channel-number">
                04
              </div>

              <div>
                <h3>Global commerce</h3>

                <p>
                  Reach customers around the world.
                </p>
              </div>

              <ArrowRight size={20} />

            </div>

          </div>


          {/* DASHBOARD */}

          <div className="commerce-dashboard">

            <div className="dashboard-top">

              <div className="dashboard-logo">
                AURA
              </div>

              <div className="dashboard-search">
                Search products...
              </div>

              <div className="dashboard-user">
                ●
              </div>

            </div>


            <div className="dashboard-body">

              <div className="dashboard-sidebar">

                <span className="sidebar-active">
                  Overview
                </span>

                <span>Orders</span>
                <span>Products</span>
                <span>Customers</span>
                <span>Analytics</span>

              </div>


              <div className="dashboard-main">

                <div className="dashboard-title">

                  <div>
                    <p>GOOD MORNING</p>
                    <h3>Store overview</h3>
                  </div>

                  <button>
                    + Add product
                  </button>

                </div>


                <div className="stats-row">

                  <div className="stat-card">

                    <p>Total sales</p>

                    <strong>₹00,000</strong>

                    <span>+0%</span>

                  </div>


                  <div className="stat-card">

                    <p>Orders</p>

                    <strong>0000</strong>

                    <span>+0%</span>

                  </div>


                  <div className="stat-card">

                    <p>Customers</p>

                    <strong>0000</strong>

                    <span>+0%</span>

                  </div>

                </div>


                <div className="chart-card">

                  <div className="chart-header">

                    <strong>Sales overview</strong>

                    <span>Last 30 days</span>

                  </div>

                  <div className="chart">

                    <div className="chart-line"></div>

                    <div className="chart-point point-one"></div>
                    <div className="chart-point point-two"></div>
                    <div className="chart-point point-three"></div>
                    <div className="chart-point point-four"></div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* BUILT FOR GROWTH */}

      <section className="growth-section">

        <div className="growth-heading">

          <p className="section-label">
            BUILT FOR GROWTH
          </p>

          <h2>
            Start small.
            <br />
            <span>Think big.</span>
          </h2>

          <p>
            Everything you need to launch, grow, and scale your
            business — without getting in your way.
          </p>

        </div>


        <div className="growth-grid">

          {/* CARD 1 */}

          <div className="growth-card">

            <div className="growth-number">
              01
            </div>

            <div className="growth-icon">
              <BarChart3 size={28} />
            </div>

            <h3>
              Grow your sales
            </h3>

            <p>
              Understand what's working and discover
              new opportunities to increase revenue.
            </p>

            <div className="growth-graph">

              <div className="growth-bar bar-1"></div>
              <div className="growth-bar bar-2"></div>
              <div className="growth-bar bar-3"></div>
              <div className="growth-bar bar-4"></div>
              <div className="growth-bar bar-5"></div>

            </div>

          </div>


          {/* CARD 2 */}

          <div className="growth-card">

            <div className="growth-number">
              02
            </div>

            <div className="growth-icon">
              <Users size={28} />
            </div>

            <h3>
              Know your customers
            </h3>

            <p>
              Build meaningful relationships with customers
              and keep them coming back.
            </p>

            <div className="customer-growth">

              <div className="customer-avatar">
                A
              </div>

              <div className="customer-avatar">
                M
              </div>

              <div className="customer-avatar">
                R
              </div>

              <div className="customer-avatar">
                S
              </div>

              <span>
                +0k customers
              </span>

            </div>

          </div>


          {/* CARD 3 */}

          <div className="growth-card dark-growth-card">

            <div className="growth-number">
              03
            </div>

            <div className="growth-icon">
              <ArrowRight size={28} />
            </div>

            <h3>
              Scale without limits
            </h3>

            <p>
              Powerful infrastructure that grows with
              your business, wherever it takes you.
            </p>

            <div className="scale-text">
              WORLDWIDE
            </div>

          </div>

        </div>

      </section>
      {/* PRICING */}

      <section className="pricing-section">

        <div className="pricing-heading">

          <p className="section-label">
            SIMPLE PRICING
          </p>

          <h2>
            Choose the plan
            <br />
            <span>that fits your business.</span>
          </h2>

          <p>
            Start today and upgrade whenever your business is ready
            for the next step.
          </p>

        </div>


        <div className="pricing-grid">

          {/* STARTER */}

          <div className="pricing-card">

            <div className="pricing-top">

              <span className="plan-number">
                01
              </span>

              <h3>Starter</h3>

              <p>
                Everything you need to launch your first store.
              </p>

            </div>


            <div className="price">

              <strong>₹499</strong>

              <span>/month</span>

            </div>


            <button className="pricing-button">
              Start free trial
              <ArrowRight size={17} />
            </button>


            <div className="pricing-divider"></div>


            <p className="included">
              INCLUDED
            </p>

            <ul>

              <li>✓ Online store</li>

              <li>✓ Unlimited products</li>

              <li>✓ Secure payments</li>

              <li>✓ Basic analytics</li>

            </ul>

          </div>


          {/* GROWTH */}

          <div className="pricing-card featured-plan">

            <div className="popular-badge">
              MOST POPULAR
            </div>

            <div className="pricing-top">

              <span className="plan-number">
                02
              </span>

              <h3>Growth</h3>

              <p>
                Powerful tools for growing businesses.
              </p>

            </div>


            <div className="price">

              <strong>₹1,499</strong>

              <span>/month</span>

            </div>


            <button className="pricing-button dark-button">
              Start free trial
              <ArrowRight size={17} />
            </button>


            <div className="pricing-divider"></div>


            <p className="included">
              EVERYTHING IN STARTER, PLUS
            </p>

            <ul>

              <li>✓ Advanced analytics</li>

              <li>✓ Marketing tools</li>

              <li>✓ Customer insights</li>

              <li>✓ Multiple sales channels</li>

            </ul>

          </div>


          {/* SCALE */}

          <div className="pricing-card">

            <div className="pricing-top">

              <span className="plan-number">
                03
              </span>

              <h3>Scale</h3>

              <p>
                Advanced commerce infrastructure for teams.
              </p>

            </div>


            <div className="price">

              <strong>₹3,999</strong>

              <span>/month</span>

            </div>


            <button className="pricing-button">
              Talk to sales
              <ArrowRight size={17} />
            </button>


            <div className="pricing-divider"></div>


            <p className="included">
              EVERYTHING IN GROWTH, PLUS
            </p>

            <ul>

              <li>✓ Advanced automation</li>

              <li>✓ Team accounts</li>

              <li>✓ Priority support</li>

              <li>✓ Custom integrations</li>

            </ul>

          </div>

        </div>

      </section>
      {/* CUSTOMER STORIES */}

      <section className="stories-section">

        <div className="stories-heading">

          <p className="section-label">
            CUSTOMER STORIES
          </p>

          <h2>
            Businesses are
            <br />
            <span>building what's next.</span>
          </h2>

        </div>


        <div className="stories-grid">

          {/* FEATURED STORY */}

          <div className="story-featured">

            <div className="story-content">

              <span className="story-category">
                FASHION
              </span>

              <h3>
                “AURA helped us turn
                <br />
                an idea into a real brand.”
              </h3>

              <p>
                We launched our store in weeks and now
                serve customers across multiple channels.
              </p>

              <div className="story-person">

                <div className="person-avatar">
                  A
                </div>

                <div>
                  <strong>
                    Arjun Menon
                  </strong>

                  <span>
                    Founder, AURA
                  </span>
                </div>

              </div>

            </div>


            <div className="story-stat">

              <strong>
                3.8×
              </strong>

              <span>
                revenue growth
              </span>

            </div>

          </div>


          {/* SMALL STORY 1 */}

          <div className="story-card">

            <span className="story-category">
              BEAUTY
            </span>

            <div className="quote-mark">
              “
            </div>

            <p>
              “Everything feels simpler.
              We can focus on our products
              instead of managing technology.”
            </p>

            <div className="story-person">

              <div className="person-avatar">
                S
              </div>

              <div>
                <strong>
                  Sara Thomas
                </strong>

                <span>
                  Founder, NOMA
                </span>
              </div>

            </div>

          </div>


          {/* SMALL STORY 2 */}

          <div className="story-card dark-story">

            <span className="story-category">
              HOME
            </span>

            <div className="quote-mark">
              “
            </div>

            <p>
              “Our online sales grew while
              our team stayed the same size.”
            </p>

            <div className="story-person">

              <div className="person-avatar">
                R
              </div>

              <div>
                <strong>
                  Rahul Nair
                </strong>

                <span>
                  Founder, FORM
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>
      {/* FINAL CTA */}

      <section className="final-cta">

        <div className="cta-content">

          <p className="section-label">
            START BUILDING
          </p>

          <h2>
            Your next chapter
            <br />
            <span>starts here.</span>
          </h2>

          <p>
            Start your store today and turn your idea
            into something people can buy.
          </p>

          <div className="cta-form">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              Start free trial
              <ArrowRight size={18} />
            </button>

          </div>

          <small>
            No credit card required · Start for free
          </small>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand">

            <div className="logo">
            YYYYYYY
            </div>

            <p>
              Commerce infrastructure
              <br />
              for the next generation.
            </p>

          </div>


          <div className="footer-links">

            <div>

              <h4>PRODUCT</h4>

              <a href="#">Online Store</a>
              <a href="#">Payments</a>
              <a href="#">Analytics</a>
              <a href="#">Point of Sale</a>

            </div>


            <div>

              <h4>COMPANY</h4>

              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
              <a href="#">Contact</a>

            </div>


            <div>

              <h4>RESOURCES</h4>

              <a href="#">Help Center</a>
              <a href="#">Blog</a>
              <a href="#">Guides</a>
              <a href="#">Community</a>

            </div>


            <div>

              <h4>LEGAL</h4>

              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
              <a href="#">Cookies</a>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 AURA Commerce. All rights reserved.
          </span>

          <span>
            Built for ambitious businesses.
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Home;