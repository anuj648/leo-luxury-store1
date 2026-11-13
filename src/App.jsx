import React, { useEffect, useMemo, useState } from 'react'
import { Search, ShoppingBag, Menu, X, Heart, ChevronDown, ArrowRight, Plus, Minus, Instagram, Facebook, Youtube, SlidersHorizontal, CheckCircle2 } from 'lucide-react'
import { products, collections } from './data'
import CustomerCarePage from './CustomerCarePage'
import { PrivacyPolicyPage, TermsConditionsPage, ShippingPolicyPage, ReturnsPolicyPage } from './PolicyPages'

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

function Header({ onCart, cartCount, onSearch, onNavigate, onWishlist, wishlistCount }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, {passive:true}); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="topline">COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹5,000</div>
    <div className="nav-wrap">
      <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button>
      <a className="wordmark" href="#home" onClick={() => { onNavigate('Home'); setMobileOpen(false) }} aria-label="La Cinderae home">La Cinderae</a>
      <nav className={mobileOpen ? 'main-nav open' : 'main-nav'}>
        {['Home', 'Shop All', 'Collections', 'Jewellery', "Women's Apparel", 'About', 'Contact'].map(n =>
          <a key={n} href={n === 'Home' ? '#home' : n === 'Collections' ? '#collections' : n === 'About' ? '#about' : n === 'Contact' ? '#contact' : '#shop'}
             onClick={() => { onNavigate(n); setMobileOpen(false) }}>{n}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={onSearch} aria-label="Search"><Search/></button>
        <button className="icon-btn wishlist-nav-btn" onClick={onWishlist} aria-label={`Wishlist, ${wishlistCount} saved items`}><Heart/><span>{wishlistCount}</span></button>
        <button className="icon-btn bag-btn" onClick={onCart} aria-label="Shopping bag"><ShoppingBag/><span>{cartCount}</span></button>
      </div>
    </div>
  </header>
}

function ProductCard({ product, onAdd, onQuickView }) {
  const [liked, setLiked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('leo-wishlist') || '[]').some(item => item.id === product.id) } catch { return false }
  })
  const toggleLike = e => {
    e.stopPropagation()
    let items = []
    try { items = JSON.parse(localStorage.getItem('leo-wishlist') || '[]') } catch { items = [] }
    const exists = items.some(item => item.id === product.id)
    items = exists ? items.filter(item => item.id !== product.id) : [...items, product]
    localStorage.setItem('leo-wishlist', JSON.stringify(items))
    setLiked(!exists)
    window.dispatchEvent(new CustomEvent('leo-wishlist-updated', { detail: { items, message: exists ? 'Removed from your wishlist' : 'Added to your wishlist' } }))
  }
  return <article className="product-card">
    <div className="product-image-wrap" onClick={() => onQuickView(product)}>
      <img src={product.image} alt={product.name} loading="lazy"/>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className={`heart-float ${liked ? 'liked' : ''}`} onClick={toggleLike} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}><Heart size={17} fill={liked ? 'currentColor' : 'none'}/></button>
      <button className="quick-add" onClick={e => { e.stopPropagation(); onAdd(product) }}>Add to Bag <Plus size={14}/></button>
    </div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.type} · {product.color}</p></div><strong>{money(product.price)}</strong></div>
  </article>
}

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return <div className="filter-group"><button className="filter-heading" onClick={() => setOpen(!open)}>{title}<ChevronDown size={15} className={open ? 'rotated' : ''}/></button>{open && <div className="filter-content">{children}</div>}</div>
}

function Shop({ category, setCategory, search, setSearch, onAdd, onQuickView, mode='shop', collectionName='', onBack }) {
  const [sort, setSort] = useState('featured')
  const [price, setPrice] = useState('all')
  const [colors, setColors] = useState([])
  const [types, setTypes] = useState([])
  const [sizes, setSizes] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
  useEffect(() => { setVisibleCount(12) }, [category, search, price, colors, types, sizes, sort, collectionName])
  const apparel = category === "Women's Apparel" || mode === 'apparel'
  const collection = mode === 'collection'
  const categoryOptions = collection ? ['Jewellery', "Women's Apparel"] : ['Jewellery', "Women's Apparel"]
  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const categoryOk = category === 'All' || p.category === category
      const searchOk = p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase())
      const priceOk = price === 'all' || (price === 'under1000' && p.price < 1000) || (price === '1000to2500' && p.price >= 1000 && p.price <= 2500) || (price === '2500to5000' && p.price > 2500 && p.price <= 5000) || (price === 'over5000' && p.price > 5000)
      const colourOk = !colors.length || colors.includes(p.color)
      const typeOk = !types.length || (collection ? (types.includes('Jewellery') && p.category==='Jewellery') || (types.includes("Women's Apparel") && p.category==="Women's Apparel") : types.includes(p.type))
      const sizeOk = p.category !== "Women's Apparel" || !sizes.length || sizes.some(x => (p.sizes || ['XS','S','M','L','XL']).includes(x))
      const collectionOk = !collection || !collectionName || p.collection === collectionName || (collectionName === 'Everyday Style' && p.price < 5000) || (collectionName === 'Modern Minimalism' && ['Rings','Necklaces','Tops'].includes(p.type)) || (collectionName === 'Evening Elegance' && ['Dresses','Earrings'].includes(p.type)) || (collectionName === 'Statement Style' && ['Bracelets','Earrings','Rings'].includes(p.type))
      return categoryOk && searchOk && priceOk && colourOk && typeOk && sizeOk && collectionOk
    })
    if (sort === 'low') list.sort((a,b) => a.price-b.price)
    if (sort === 'high') list.sort((a,b) => b.price-a.price)
    return list
  }, [category, search, price, colors, types, sizes, sort, collection, collectionName])
  const toggle = (value, setter) => setter(old => old.includes(value) ? old.filter(x=>x!==value) : [...old,value])
  const filters = <>
    {mode === 'shop' && <FilterGroup title="Category">{['All',...categoryOptions].map(c=><label className="check-row" key={c}><input type="radio" checked={category===c} onChange={()=>setCategory(c)}/>{c==='All'?'All Products':c}</label>)}</FilterGroup>}
    {(mode === 'jewellery' || mode === 'apparel' || collection) && <FilterGroup title={collection?'Product Type':apparel?'Clothing Type':'Jewellery Type'}>{(collection?['Jewellery',"Women's Apparel"]:apparel?['Tops','Shirts','Dresses','Bottoms','Co-ord Sets']:['Earrings','Necklaces','Rings','Bracelets']).map(t=><label className="check-row" key={t}><input type="checkbox" checked={types.includes(t)} onChange={()=>toggle(t,setTypes)}/>{t}</label>)}</FilterGroup>}
    {apparel || (collection && types.includes("Women's Apparel")) ? <FilterGroup title="Size"><div className="size-options">{['XS','S','M','L','XL'].map(x=><button className={sizes.includes(x)?'size-chip selected':'size-chip'} onClick={()=>toggle(x,setSizes)} key={x}>{x}</button>)}</div></FilterGroup> : null}
    <FilterGroup title="Price"><select value={price} onChange={e=>setPrice(e.target.value)}><option value="all">All prices</option><option value="under1000">Under ₹1,000</option><option value="1000to2500">₹1,000 – ₹2,500</option><option value="2500to5000">₹2,500 – ₹5,000</option><option value="over5000">Above ₹5,000</option></select></FilterGroup>
    <FilterGroup title="Colour"><div className="color-options">{['Gold','Black','Beige','White'].map(c=><button key={c} title={c} className={`color-chip ${c.toLowerCase()} ${colors.includes(c)?'selected':''}`} onClick={()=>toggle(c,setColors)}/>)}</div><div className="small-muted">{colors.length?colors.join(', '):'Choose a colour'}</div></FilterGroup>
  </>
  const title = collection ? collectionName : mode==='jewellery'?'Jewellery':mode==='apparel'?"Women's Apparel":category==='All'?'Shop All':category
  return <section id="shop" className="shop-section section-pad" style={{ paddingTop: 0 }}>
    <div className="shop-banner" style={{ marginTop: 0, transform: 'none' }}><div><span className="eyebrow">THE LA CINDERAE EDIT</span><h1>{title}</h1><p>{collection?'Curated styles for every mood, moment and you.':'Discover our curated selection of jewellery and apparel.'}</p></div></div>
    <div className="shop-toolbar"><div><span className="eyebrow">CURATED FOR YOU</span><h2>{collection?collectionName:'Considered essentials'}</h2><p>{filtered.length} Products</p></div><div className="toolbar-controls"><button className="outline-btn mobile-filter" onClick={()=>setFilterOpen(!filterOpen)}><SlidersHorizontal size={15}/> Filter</button><label className="sort-label">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Recommended</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></label></div></div>
    <div className="shop-layout"><aside className={`filters ${filterOpen?'filters-open':''}`}><div className="filter-top"><b>Filter</b><button onClick={()=>{setCategory(mode==='shop'?'All':category);setPrice('all');setColors([]);setTypes([]);setSizes([]);setSearch('')}}>Clear All</button></div>{filters}</aside>
      <div className="product-grid">{filtered.length?filtered.slice(0,visibleCount).map(p=><ProductCard key={p.id} product={p} onAdd={onAdd} onQuickView={onQuickView}/>):<div className="empty-state">No pieces match those filters. Try clearing a filter.</div>}</div>
      {filtered.length > visibleCount && <div className="load-more-wrap"><button className="load-more-btn" onClick={()=>setVisibleCount(n=>n+12)}>Load More <span>↓</span></button><small>Showing {Math.min(visibleCount,filtered.length)} of {filtered.length} pieces</small></div>}
    </div>
  </section>
}

const collectionThemes = [
  {title:'Everyday Style',subtitle:'Effortless pieces for every day.',image:'/images/ai-jewellery-editorial.jpg'},
  {title:'Modern Minimalism',subtitle:'Clean lines. Quiet luxury.',image:'/images/ai-product-4.jpg'},
  {title:'Evening Elegance',subtitle:'A little more extraordinary.',image:'/images/ai-product-7.jpg'},
  {title:'Statement Style',subtitle:'Pieces that speak for you.',image:'/images/ai-product-8.jpg'}
]
function CollectionsLanding({onSelect,onAdd,onProduct}) {
 return <main className="collection-landing">
  <section className="collection-hero"><div><h1>Collections</h1><p>Curated styles for every mood, moment and you.</p><button className="outline-btn" onClick={()=>document.getElementById('collection-themes')?.scrollIntoView({behavior:'smooth'})}>Explore Our Collections <ArrowRight size={14}/></button></div></section>
  <section id="collection-themes" className="collection-theme-grid">{collectionThemes.map(c=><button className="collection-theme" key={c.title} onClick={()=>onSelect(c.title)}><img src={c.image} alt={c.title}/><span>{c.title}<small>Explore →</small></span></button>)}</section>
  <div className="collection-no-filter-note">Explore a visual edit of pieces chosen to complement your style.</div>
  <section className="collection-featured"><h2>Curated for every moment</h2><p>Discover the pieces that make every look your own.</p><div className="product-grid home-products">{products.slice(0,10).map(p=><ProductCard key={p.id} product={p} onAdd={onAdd} onQuickView={onProduct}/>)}</div></section>
  <section className="collection-newsletter"><div><h2>Be the First to Know</h2><p>Get exclusive updates, new arrivals and special offers.</p><form onSubmit={e=>{e.preventDefault();alert('Thank you for subscribing!')}}><input type="email" placeholder="Your email address" required/><button>Subscribe</button></form></div></section>
 </main>
}
function ProductDetails({product,onAdd,onBuy,onBack}) {
 const [active,setActive]=useState(0),[size,setSize]=useState('M'),[color,setColor]=useState(product.color||'Gold')
 const [liked,setLiked]=useState(() => { try { return JSON.parse(localStorage.getItem('leo-wishlist') || '[]').some(item => item.id === product.id) } catch { return false } })
 const toggleDetailWishlist = () => { let items=[]; try { items=JSON.parse(localStorage.getItem('leo-wishlist') || '[]') } catch {} const exists=items.some(item=>item.id===product.id); items=exists?items.filter(item=>item.id!==product.id):[...items,product]; localStorage.setItem('leo-wishlist',JSON.stringify(items)); setLiked(!exists); window.dispatchEvent(new CustomEvent('leo-wishlist-updated',{detail:{items,message:exists?'Removed from your wishlist':'Added to your wishlist'}})) }
 const gallery=[product.image,'/images/ai-product-5.jpg','/images/ai-product-8.jpg','/images/ai-jewellery-editorial.jpg']
 return <main className="product-detail-page section-pad"><div className="breadcrumbs"><button onClick={onBack}>Home</button> › <button onClick={onBack}>Shop All</button> › {product.name}</div><div className="product-detail-layout"><div className="product-gallery"><div className="gallery-thumbs">{gallery.map((img,i)=><button className={active===i?'active':''} key={img+i} onClick={()=>setActive(i)}><img src={img} alt={`${product.name} view ${i+1}`}/></button>)}</div><div className="gallery-main"><img src={gallery[active]} alt={product.name}/><button className={`detail-heart ${liked ? 'liked' : ''}`} onClick={toggleDetailWishlist} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}><Heart size={19} fill={liked ? 'currentColor' : 'none'}/></button></div></div><div className="product-detail-info"><h1>{product.name}</h1><strong className="detail-price">{money(product.price)}</strong><div className="detail-rating">★★★★★ <span>4.8 (124 reviews)</span></div><p className="detail-description">A sculptural statement, designed for everyday elegance. Thoughtfully selected for timeless style and effortless versatility.</p><h4>Colour: {color}</h4><div className="detail-colors"><button onClick={()=>setColor('Gold')} className={`gold ${color==='Gold'?'selected':''}`} aria-label="Gold colour"/><button onClick={()=>setColor('Beige')} className={`beige ${color==='Beige'?'selected':''}`} aria-label="Beige colour"/></div>{(product.category==="Women's Apparel")&&<><h4>Size: <a href="#size-guide">Size Guide</a></h4><div className="detail-sizes">{['S','M','L','XL'].map(x=><button className={size===x?'selected':''} onClick={()=>setSize(x)} key={x}>{x}</button>)}</div></>}<button className="dark-btn full detail-add" onClick={()=>onAdd({...product,color,size})}>Add to Bag <ShoppingBag size={16}/></button><button className="outline-btn full" onClick={()=>onBuy({...product,color,size})}>♧ &nbsp; Buy Now</button><div className="service-icons"><span>♢<small>Premium<br/>Quality</small></span><span>↻<small>Easy<br/>Returns</small></span><span>♧<small>Secure<br/>Payment</small></span></div><div className="detail-accordions"><details><summary>Product Details</summary><p>{product.type} · {product.category}. Designed with considered details for everyday wear.</p></details><details><summary>Shipping & Returns</summary><p>Complimentary shipping on eligible orders. Easy returns within the applicable return window.</p></details><details><summary>Care Instructions</summary><p>Store carefully and keep away from moisture, perfumes and harsh chemicals.</p></details></div></div></div><section className="you-may-like"><h2>You Might Also Like</h2><div className="product-grid home-products">{products.filter(p=>p.id!==product.id).slice(0,4).map(p=><ProductCard key={p.id} product={p} onAdd={onAdd} onQuickView={()=>{}}/>)}</div></section></main>
}

function CartDrawer({ open, onClose, cart, updateQty, onCheckout }) {
  const subtotal = cart.reduce((s,i) => s + i.price*i.qty, 0)
  return <><div className={`scrim ${open ? 'visible' : ''}`} onClick={onClose}/><aside className={`cart-drawer ${open ? 'drawer-open' : ''}`}><div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your Bag ({cart.reduce((s,i)=>s+i.qty,0)})</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div>
    <div className="cart-items">{cart.length ? cart.map(i => <div className="cart-item" key={i.id}><img src={i.image} alt={i.name}/><div className="cart-item-info"><h3>{i.name}</h3><p>{money(i.price)}</p><div className="qty-control"><button onClick={() => updateQty(i.id, -1)}><Minus size={13}/></button><span>{i.qty}</span><button onClick={() => updateQty(i.id, 1)}><Plus size={13}/></button></div></div><strong>{money(i.price*i.qty)}</strong></div>) : <div className="empty-cart"><ShoppingBag size={30}/><h3>Your bag is waiting</h3><p>Discover something beautiful.</p><button className="dark-btn" onClick={onClose}>Continue Shopping</button></div>}</div>
    {cart.length > 0 && <div className="drawer-bottom"><div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="dark-btn full" onClick={onCheckout}>Proceed to Checkout <ArrowRight size={16}/></button></div>}
  </aside></>
}

function Checkout({ cart, onBack, onComplete }) {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', address:'', city:'', state:'', pin:'', payment:'cod' })
  const [errors, setErrors] = useState({})
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0)
  const set = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = e => {
    e.preventDefault()
    const required = ['firstName','lastName','email','phone','address','city','state','pin']
    const next = {}
    required.forEach(k => { if (!form[k].trim()) next[k] = 'Required' })
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.pin && !/^\d{6}$/.test(form.pin)) next.pin = 'Enter a 6-digit PIN'
    setErrors(next)
    if (!Object.keys(next).length) onComplete(form)
  }
  const field = (name,label,type='text') => <label className="form-field">{label}<input name={name} type={type} value={form[name]} onChange={set} className={errors[name]?'invalid':''}/>{errors[name] && <small>{errors[name]}</small>}</label>
  return <section className="checkout-page section-pad"><button className="text-back" onClick={onBack}>← Back to bag</button><span className="eyebrow">A FEW MORE DETAILS</span><h1>Checkout</h1><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>Contact information</h2><div className="form-grid">{field('firstName','First name')}{field('lastName','Last name')}{field('email','Email address','email')}{field('phone','Phone number','tel')}</div><h2>Delivery address</h2><div className="form-grid">{field('address','Street address')}{field('city','City')}{field('state','State')}{field('pin','PIN code')}</div><h2>Payment method</h2><label className="payment-option"><input type="radio" name="payment" value="cod" checked={form.payment==='cod'} onChange={set}/> Cash on Delivery <span>Pay when your order arrives</span></label><label className="payment-option"><input type="radio" name="payment" value="online-demo" checked={form.payment==='online-demo'} onChange={set}/> Online payment <span>Demo option — no payment is collected</span></label><button className="dark-btn full submit-order" type="submit">Place Demo Order <ArrowRight size={16}/></button><p className="secure-note">This demo checkout does not process real payments.</p></form><div className="order-summary"><h2>Order summary</h2>{cart.map(i=><div className="summary-item" key={i.id}><img src={i.image} alt={i.name}/><div><b>{i.name}</b><p>Qty: {i.qty}</p></div><strong>{money(i.price*i.qty)}</strong></div>)}<div className="summary-line"><span>Subtotal</span><b>{money(total)}</b></div><div className="summary-line"><span>Shipping</span><b>{total >= 5000 ? 'Complimentary' : '₹150'}</b></div><div className="summary-line total-line"><span>Total</span><b>{money(total + (total >= 5000 ? 0 : 150))}</b></div></div></div></section>
}


function AboutPage() {
 return <main className="brand-page about-page about-atelier">
  <section className="atelier-hero">
   <div className="atelier-hero-copy"><span className="atelier-kicker">THE HOUSE OF LA CINDERAE · EST. 2016</span><h1>Elegance is<br/><em>an attitude.</em></h1><p>We create pieces that let your individuality take the lead — with confidence, character and quiet luxury.</p><a href="#atelier-story" className="atelier-hero-link">GET TO KNOW US <ArrowRight size={16}/></a></div>
   <div className="atelier-hero-photo"><img src="/images/about-hero.jpg" alt="La Cinderae fashion portrait"/><span>01 — THE LA CINDERAE WOMAN</span></div>
   <div className="atelier-side-note">A PERSONAL KIND OF LUXURY</div>
  </section>
  <section className="atelier-story" id="atelier-story">
   <div className="atelier-story-image"><img src="/images/about-story.jpg" alt="Modern fashion editorial"/><span>THE ART OF BEING YOURSELF</span></div>
   <div className="atelier-story-copy"><span className="atelier-kicker">OUR STORY</span><h2>Not made to follow.<br/><em>Made to be remembered.</em></h2><p>La Cinderae was born from a love of thoughtful design and the belief that what you wear should feel unmistakably yours. We bring together expressive silhouettes, considered details and versatile essentials for a wardrobe with its own point of view.</p><p>From the first sketch to the finishing touch, every choice is guided by one idea: style should feel effortless, personal and enduring.</p><a className="atelier-text-link" href="#atelier-values">THE DETAILS THAT DEFINE US <ArrowRight size={15}/></a></div>
   <div className="atelier-detail-photo"><img src="/images/about-wardrobe.jpg" alt="Fashion styling detail"/></div>
  </section>
  <section className="atelier-manifesto"><div><span className="atelier-kicker">OUR POINT OF VIEW</span><h2>Wear what<br/>moves <em>you.</em></h2></div><p>We believe true elegance is never loud. It lives in the confidence of a perfect fit, the feel of a beautiful fabric and the freedom to make every look your own.</p><div className="atelier-manifesto-mark">LC<span>✳</span></div></section>
  <section className="atelier-values" id="atelier-values"><div className="atelier-values-head"><span className="atelier-kicker">THE LA CINDERAE STANDARD</span><h2>Our values, in every detail.</h2></div><div className="atelier-value-grid"><article><b>01</b><span className="atelier-value-icon">✧</span><h3>Considered design</h3><p>Purposeful shapes and details, made to feel right from the first wear.</p></article><article><b>02</b><span className="atelier-value-icon">◌</span><h3>Everyday distinction</h3><p>Pieces that move easily between the everyday and the extraordinary.</p></article><article><b>03</b><span className="atelier-value-icon">♡</span><h3>Confidence first</h3><p>Personal style, always. We make room for you to define your own elegance.</p></article></div></section>
  <section className="atelier-stats"><div><strong>10+</strong><span>YEARS OF STYLE</span></div><div><strong>50K+</strong><span>HAPPY CUSTOMERS</span></div><div><strong>25+</strong><span>CURATED COLLECTIONS</span></div></section>
  <section className="atelier-ending"><span>LA CINDERAE’S</span><h2>Your style.<br/><em>Your story.</em></h2><p>Thank you for making us part of yours.</p></section>
 </main>
}

function ContactPage() {
 const [sent,setSent]=useState(false)
 return <main className="brand-page contact-page contact-v2">
  <section className="contact-v2-masthead"><div className="contact-v2-masthead-copy"><span className="eyebrow">A LITTLE HELP, A HUMAN TOUCH</span><h1>Let's make<br/><i>things easy.</i></h1><p>Questions, thoughts or a little styling advice? Our team is just a note away.</p></div><div className="contact-v2-masthead-image"><img src="/images/about-hero.jpg" alt="Luxury fashion and accessories"/><span>WE’RE HAPPY YOU’RE HERE</span></div></section>
  <section className="contact-v2-main"><aside className="contact-v2-aside"><span className="eyebrow">GET IN TOUCH</span><h2>Good conversations<br/>start here.</h2><p>Choose the way that feels right. We’ll make sure your message reaches the right person.</p><div className="contact-v2-channel"><span>01</span><div><b>Customer care</b><small>For orders, delivery and returns</small><small>Send an enquiry using the form</small></div></div><div className="contact-v2-channel"><span>02</span><div><b>Style enquiries</b><small>For product and styling questions</small><small>We’re happy to help you choose</small></div></div><div className="contact-v2-hours"><b>A PERSONAL RESPONSE</b><p>Leave us a note and our team will get back to you as soon as possible.</p></div></aside>
   <form className="contact-v2-form" onSubmit={e=>{e.preventDefault();setSent(true);e.currentTarget.reset()}}><div className="contact-form-heading"><span>YOUR NOTE TO US</span><h2>How can we help?</h2><p>Fill in the details below and we’ll be in touch.</p></div><div className="contact-v2-fields"><label>Your name *<input required placeholder="e.g. Ananya Sharma"/></label><label>Email address *<input type="email" required placeholder="you@example.com"/></label><label>What is this about?<select defaultValue=""><option value="" disabled>Select a topic</option><option>My order</option><option>Product enquiry</option><option>Shipping & returns</option><option>Something else</option></select></label><label className="message-field">Your message *<textarea rows="5" required placeholder="Write your message here..."/></label></div><button className="contact-v2-submit" type="submit">{sent?'MESSAGE RECEIVED':'SEND YOUR MESSAGE'} <ArrowRight size={16}/></button>{sent&&<p className="contact-success" role="status">Thank you for reaching out. Our team will be in touch soon.</p>}<small className="contact-v2-privacy">We’ll only use your details to respond to your enquiry.</small></form>
  </section>
  <section className="contact-v2-bottom"><span>LA CINDERAE · CUSTOMER CARE</span><h2>We look forward to<br/><i>hearing from you.</i></h2></section>
 </main>
}

function App() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('leo-cart') || '[]') } catch { return [] } })
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [quick, setQuick] = useState(null)
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCollection, setSelectedCollection] = useState('')
  const [order, setOrder] = useState(null)
  const [wishlist, setWishlist] = useState(() => { try { return JSON.parse(localStorage.getItem('leo-wishlist') || '[]') } catch { return [] } })
  const [wishlistToast, setWishlistToast] = useState('')
  useEffect(() => localStorage.setItem('leo-cart', JSON.stringify(cart)), [cart])
  useEffect(() => {
    const nodes = document.querySelectorAll('.section-heading,.product-card,.collection-card,.about-section,.atelier-story,.contact-v2-main,.shop-banner')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: .08 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [page])
  useEffect(() => {
    const handleWishlist = event => { setWishlist(event.detail.items || []); setWishlistToast(event.detail.message || 'Wishlist updated') }
    window.addEventListener('leo-wishlist-updated', handleWishlist)
    return () => window.removeEventListener('leo-wishlist-updated', handleWishlist)
  }, [])
  useEffect(() => { if (!wishlistToast) return; const timer = setTimeout(() => setWishlistToast(''), 2600); return () => clearTimeout(timer) }, [wishlistToast])
  const add = p => { setCart(old => { const found = old.find(i=>i.id===p.id); return found ? old.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i) : [...old,{...p,qty:1}] }); setCartOpen(true) }
  const updateQty = (id, delta) => setCart(old => old.map(i=>i.id===id?{...i,qty:i.qty+delta}:i).filter(i=>i.qty>0))
  const navigate = n => {
    if (n==='Jewellery' || n==="Women's Apparel") {
      setCategory(n); setPage(n==='Jewellery'?'jewellery':'apparel'); window.scrollTo(0,0)
    } else if (n==='Shop All' || n==='Shop' || n==='shop') {
      setCategory('All'); setPage('shop'); window.scrollTo(0,0)
    } else if (n==='Collections') {
      setPage('collections'); window.scrollTo(0,0)
    } else if (n==='About') {
      setPage('about'); window.scrollTo(0,0)
    } else if (n==='Contact') {
      setPage('contact'); window.scrollTo(0,0)
    } else if (n==='Customer Care' || n==='customer-care') {
      setPage('customer-care'); window.scrollTo(0,0)
    } else if (n==='Privacy Policy' || n==='privacy') {
      setPage('privacy'); window.scrollTo(0,0)
    } else if (n==='Terms & Conditions' || n==='terms') {
      setPage('terms'); window.scrollTo(0,0)
    } else if (n==='Shipping Policy' || n==='shipping') {
      setPage('shipping'); window.scrollTo(0,0)
    } else if (n==='Returns Policy' || n==='returns') {
      setPage('returns'); window.scrollTo(0,0)
    } else {
      setPage('home'); window.scrollTo({top:0,behavior:'smooth'})
    }
  }
  const checkout = () => { setCartOpen(false);setPage('checkout');window.scrollTo(0,0) }
  const complete = details => { setOrder({details, number:'LC-'+Math.floor(100000+Math.random()*900000)});setCart([]);setPage('success');window.scrollTo(0,0) }
  return <><Header onCart={()=>setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.qty,0)} onSearch={()=>setSearchOpen(!searchOpen)} onNavigate={navigate} wishlistCount={wishlist.length} onWishlist={()=>{setPage('wishlist');window.scrollTo(0,0)}}/>
    {searchOpen && <div className="search-bar"><Search size={18}/><input autoFocus placeholder="Search pieces, jewellery, apparel..." value={search} onChange={e=>{setSearch(e.target.value);setPage('shop')}}/><button onClick={()=>{setSearch('');setSearchOpen(false)}}><X size={18}/></button></div>}
    {page==='home' && <>
      <main>
        <section id="home" className="hero"><img src="/images/ai-luxury-hero.jpg" alt="Elegant fashion editorial"/><div className="hero-shade"/><div className="hero-copy"><span className="eyebrow light">THE ART OF EVERYDAY ELEGANCE</span><h1>Elegance<br/>in Every Detail</h1><p>Timeless fashion. Effortless you.</p><button className="cream-btn" onClick={()=>{setCategory('All');setPage('shop');window.scrollTo(0,0)}}>Shop The Look <ArrowRight size={15}/></button></div><div className="hero-index">01 / 03</div></section>
        <section className="explore section-pad"><div className="section-heading"><span className="eyebrow">THE WORLD OF LA CINDERAE</span><h2>Explore Our World</h2><p>Thoughtfully chosen. Beautifully made.</p></div><div className="category-tiles"><button onClick={()=>navigate('Jewellery')}><img src="/images/ai-jewellery-editorial.jpg"/><span>Jewellery <ArrowRight size={14}/></span></button><button onClick={()=>navigate("Women's Apparel")}><img src="/images/ai-apparel-editorial.jpg"/><span>Women's Apparel <ArrowRight size={14}/></span></button><button onClick={()=>navigate('Shop All')}><img src="/images/ai-apparel-editorial.jpg"/><span>Discover All <ArrowRight size={14}/></span></button></div></section>
        <section className="arrivals section-pad"><div className="section-heading side-heading"><div><span className="eyebrow">JUST LANDED</span><h2>New Arrivals</h2><p>Fresh perspectives on timeless style.</p></div><button className="text-link" onClick={()=>{setCategory('All');setPage('shop');window.scrollTo(0,0)}}>Shop All <ArrowRight size={16}/></button></div><div className="product-grid home-products">{products.slice(0,8).map(p=><ProductCard key={p.id} product={p} onAdd={add} onQuickView={p=>{setSelectedProduct(p);setPage('product');window.scrollTo(0,0)}}/>)}</div></section>
        <section id="collections" className="collections section-pad"><div className="section-heading"><span className="eyebrow">STORIES IN STYLE</span><h2>Our Collections</h2><p>Curated for every mood, moment and you.</p></div><div className="collection-grid">{collections.map((c,i)=><article className={`collection-card collection-${i}`} key={c.title}><img src={c.image} alt={c.title}/><div><span className="eyebrow light">LA CINDERAE COLLECTION</span><h3>{c.title}</h3><p>{c.subtitle}</p><button className="cream-outline" onClick={()=>{setSelectedCollection(c.title);setCategory('All');setPage('individual-collection');window.scrollTo(0,0)}}>Explore Collection <ArrowRight size={14}/></button></div></article>)}</div></section>
        <section className="club section-pad"><span className="eyebrow light">A LITTLE MORE LA CINDERAE</span><h2>Join Our Exclusive Club</h2><p>Be the first to know about new arrivals and offers.</p><form onSubmit={e=>{e.preventDefault();alert('Thank you for joining the La Cinderae list!')}}><input type="email" placeholder="Your email address" required/><button aria-label="Subscribe"><ArrowRight/></button></form></section>

      </main>
      <Footer onNavigate={navigate}/>
    </>}
    {page==='about' && <><AboutPage/><Footer onNavigate={navigate}/></>}
    {page==='contact' && <><ContactPage/><Footer onNavigate={navigate}/></>}
    {page==='customer-care' && <><CustomerCarePage onNavigate={navigate}/><Footer onNavigate={navigate}/></>}
    {page==='privacy' && <><PrivacyPolicyPage onNavigate={navigate}/><Footer onNavigate={navigate}/></>}
    {page==='terms' && <><TermsConditionsPage onNavigate={navigate}/><Footer onNavigate={navigate}/></>}
    {page==='shipping' && <><ShippingPolicyPage onNavigate={navigate}/><Footer onNavigate={navigate}/></>}
    {page==='returns' && <><ReturnsPolicyPage onNavigate={navigate}/><Footer onNavigate={navigate}/></>}
    {page==='shop' && <><Shop category={category} setCategory={setCategory} search={search} setSearch={setSearch} onAdd={add} onQuickView={p=>{setSelectedProduct(p);setPage('product');window.scrollTo(0,0)}}/><Footer onNavigate={navigate}/></>}
    {page==='jewellery' && <><Shop mode="jewellery" category="Jewellery" setCategory={setCategory} search={search} setSearch={setSearch} onAdd={add} onQuickView={p=>{setSelectedProduct(p);setPage('product');window.scrollTo(0,0)}}/><Footer onNavigate={navigate}/></>}
    {page==='apparel' && <><Shop mode="apparel" category="Women's Apparel" setCategory={setCategory} search={search} setSearch={setSearch} onAdd={add} onQuickView={p=>{setSelectedProduct(p);setPage('product');window.scrollTo(0,0)}}/><Footer onNavigate={navigate}/></>}
    {page==='collections' && <><CollectionsLanding onAdd={add} onProduct={p=>{setSelectedProduct(p);setPage('product');window.scrollTo(0,0)}} onSelect={name=>{setSelectedCollection(name);setCategory('All');setPage('individual-collection');window.scrollTo(0,0)}}/><Footer onNavigate={navigate}/></>}
    {page==='individual-collection' && <><Shop mode="collection" collectionName={selectedCollection} category="All" setCategory={setCategory} search={search} setSearch={setSearch} onAdd={add} onQuickView={p=>{setSelectedProduct(p);setPage('product');window.scrollTo(0,0)}}/><Footer onNavigate={navigate}/></>}
    {page==='product' && selectedProduct && <><ProductDetails product={selectedProduct} onAdd={add} onBuy={p=>{setCart(old=>{const found=old.find(i=>i.id===p.id);return found?old.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...old,{...p,qty:1}]});setPage('checkout');setCartOpen(false);window.scrollTo(0,0)}} onBack={()=>{setPage('shop');window.scrollTo(0,0)}}/><Footer onNavigate={navigate}/></>}
    {page==='wishlist' && <><main className="wishlist-page section-pad"><div className="section-heading"><span className="eyebrow">YOUR SAVED PIECES</span><h2>My Wishlist</h2><p>{wishlist.length} {wishlist.length===1?'piece':'pieces'} saved</p></div>{wishlist.length ? <div className="product-grid wishlist-grid">{wishlist.map(p=><ProductCard key={p.id} product={p} onAdd={add} onQuickView={p=>{setSelectedProduct(p);setPage('product');window.scrollTo(0,0)}}/>)}</div> : <div className="wishlist-empty"><Heart size={32}/><h3>Your wishlist is empty</h3><p>Save the pieces you love and find them here.</p><button className="dark-btn" onClick={()=>{setPage('shop');setCategory('All');window.scrollTo(0,0)}}>Explore Products</button></div>}</main><Footer onNavigate={navigate}/></>}
    {page==='checkout' && <><Checkout cart={cart} onBack={()=>{setPage('shop');setCartOpen(true)}} onComplete={complete}/><Footer onNavigate={navigate}/></>}
    {page==='success' && <><section className="success-page"><CheckCircle2 size={54}/><span className="eyebrow">THANK YOU FOR CHOOSING LA CINDERAE</span><h1>Your order is placed.</h1><p>Your demo order number is <b>{order?.number}</b>.</p><p>A real store would send an order confirmation to {order?.details.email}.</p><button className="dark-btn" onClick={()=>{setPage('home');window.scrollTo(0,0)}}>Continue Exploring <ArrowRight size={15}/></button></section><Footer onNavigate={navigate}/></>}
    {wishlistToast && <div className="wishlist-toast" role="status"><Heart size={16}/> {wishlistToast}</div>}
    <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} updateQty={updateQty} onCheckout={checkout}/>

  </>
}

function Footer({ onNavigate }) {
  return <footer className="footer">
    <div className="footer-main">
      <div className="footer-brand">
        <a className="wordmark footer-logo" href="#home" onClick={e => { e.preventDefault(); onNavigate?.('Home') }}>La Cinderae</a>
        <p>Luxury, thoughtfully considered.</p>
        <div className="socials">
          <a href="#instagram" aria-label="Instagram"><Instagram/></a>
          <a href="#facebook" aria-label="Facebook"><Facebook/></a>
          <a href="#youtube" aria-label="Youtube"><Youtube/></a>
        </div>
      </div>
      <div>
        <h4
          className="footer-clickable-heading"
          onClick={() => onNavigate?.('Shop All')}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onNavigate?.('Shop All')}
          title="Explore Shop"
        >
          SHOP
        </h4>
        <a href="#shop" onClick={e => { e.preventDefault(); onNavigate?.('Shop All') }}>Shop All</a>
        <a href="#shop" onClick={e => { e.preventDefault(); onNavigate?.('Jewellery') }}>Jewellery</a>
        <a href="#shop" onClick={e => { e.preventDefault(); onNavigate?.("Women's Apparel") }}>Women's Apparel</a>
        <a href="#collections" onClick={e => { e.preventDefault(); onNavigate?.('Collections') }}>Collections</a>
      </div>
      <div>
        <h4
          className="footer-clickable-heading"
          onClick={() => onNavigate?.('Customer Care')}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onNavigate?.('Customer Care')}
          title="Customer Care & Support"
        >
          CUSTOMER CARE
        </h4>
        <a href="#customer-care" onClick={e => { e.preventDefault(); onNavigate?.('Customer Care') }}>FAQs</a>
        <a href="#shipping" onClick={e => { e.preventDefault(); onNavigate?.('Shipping Policy') }}>Shipping & Delivery</a>
        <a href="#returns" onClick={e => { e.preventDefault(); onNavigate?.('Returns Policy') }}>Returns & Exchanges</a>
        <a href="#contact" onClick={e => { e.preventDefault(); onNavigate?.('Contact') }}>Contact Us</a>
      </div>
      <div>
        <h4
          className="footer-clickable-heading"
          onClick={() => onNavigate?.('About')}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onNavigate?.('About')}
          title="About La Cinderae"
        >
          ABOUT
        </h4>
        <a href="#about" onClick={e => { e.preventDefault(); onNavigate?.('About') }}>Our Story</a>
        <a href="#about" onClick={e => { e.preventDefault(); onNavigate?.('About') }}>Sustainability</a>
        <a href="#about" onClick={e => { e.preventDefault(); onNavigate?.('About') }}>Careers</a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 La Cinderae. All rights reserved.</span>
      <div>
        <a href="#privacy" onClick={e => { e.preventDefault(); onNavigate?.('Privacy Policy') }}>Privacy Policy</a>
        <a href="#terms" onClick={e => { e.preventDefault(); onNavigate?.('Terms & Conditions') }}>Terms & Conditions</a>
        <a href="#shipping" onClick={e => { e.preventDefault(); onNavigate?.('Shipping Policy') }}>Shipping Policy</a>
        <a href="#returns" onClick={e => { e.preventDefault(); onNavigate?.('Returns Policy') }}>Returns Policy</a>
      </div>
      <span>Made with intention.</span>
    </div>
  </footer>
}

export default App