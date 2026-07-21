import { useEffect, useMemo, useRef, useState } from 'react'
import birdImage from '../bird.jpg'
import catImage from '../cat.jpg'
import cat2Image from '../cat2.jpg'
import dogImage from '../dog1.avif'
import dog2Image from '../dog2.jpg'
import rabbitImage from '../rabbit.jpg'
import petPlaceholder from './assets/pet-placeholder.svg'

const PETS = [
  {
    id: 'zuko',
    name: 'Zuko',
    species: 'bird',
    rarity: 'legendary',
    cp: 91,
    age: '4 yrs',
    photo: birdImage,
    stats: { Energy: 80, Affection: 60, Playfulness: 70, Independence: 85 },
    tags: ['Waited 400+ days', 'Experienced owner'],
    bio: 'A rescued parrot with a dramatic streak and a patient heart. Zuko is ready for a home that can match his confidence and routine.',
    careGuide: {
      lifespan: '40-60 years',
      exerciseNeeds: '3-4 hours daily interaction & mental stimulation',
      diet: 'Seeds, nuts, vegetables, pellets',
      costs: '$30-50/month for food & enrichment',
      specialNeeds: 'Large cage, social interaction, veterinary care',
    },
    readinessChecklist: [
      '✓ Large cage (minimum 24" × 36" × 24")',
      '✓ Perches and toys for enrichment',
      '✓ Avian veterinarian contact',
      '✓ Dietary variety planned (seeds, vegetables, pellets)',
      '✓ 3+ hours daily available for interaction',
      '✓ Quiet space for sleep (10+ hours)',
      '✓ Cleaning supplies for cage maintenance',
    ],
  },
  {
    id: 'biscuit',
    name: 'Biscuit',
    species: 'dog',
    rarity: 'common',
    cp: 82,
    age: '2 yrs',
    photo: dogImage,
    stats: { Energy: 92, Affection: 75, Playfulness: 88, Independence: 35 },
    tags: ['New arrival', 'Good with kids'],
    bio: 'A lab mix with endless fetch energy. Biscuit loves people, other dogs, and anyone who can keep up with one more round.',
    careGuide: {
      lifespan: '10-14 years',
      exerciseNeeds: '2+ hours daily (fetch, walks, play)',
      diet: 'High-quality dog food (2 cups/day)',
      costs: '$50-100/month for food, vet, insurance',
      specialNeeds: 'Fenced yard recommended, regular vet visits',
    },
    readinessChecklist: [
      '✓ Food & water bowls',
      '✓ High-quality dog food (2-week supply)',
      '✓ Collar, leash, ID tag',
      '✓ Dog bed & blankets',
      '✓ Toys for play & mental stimulation',
      '✓ Grooming supplies & schedule',
      '✓ Veterinary appointment booked',
      '✓ 2+ hours daily available for exercise',
    ],
  },
  {
    id: 'mochi',
    name: 'Mochi',
    species: 'cat',
    rarity: 'rare',
    cp: 68,
    age: '9 yrs',
    photo: catImage,
    stats: { Energy: 35, Affection: 80, Playfulness: 30, Independence: 75 },
    tags: ['Senior', 'Needs quiet home'],
    bio: 'A dignified senior who prefers a sunny windowsill to chaos. Mochi is ideal for a calm household ready to give extra comfort.',
    careGuide: {
      lifespan: '15-20 years',
      exerciseNeeds: 'Light play & window perches (low-impact)',
      diet: 'Senior cat food, fresh water daily',
      costs: '$30-60/month (includes senior vet care)',
      specialNeeds: 'Quiet environment, easy litter access, regular vet checkups',
    },
    readinessChecklist: [
      '✓ Litter box (easy entry, near bathroom)',
      '✓ Senior cat food & water bowls',
      '✓ Soft bedding in quiet space',
      '✓ Window perch for sunbathing',
      '✓ Low-step furniture',
      '✓ Quiet household (minimize stress)',
      '✓ Geriatric vet appointment',
      '✓ Medications/supplements if prescribed',
    ],
  },
  {
    id: 'pepper',
    name: 'Pepper',
    species: 'rabbit',
    rarity: 'uncommon',
    cp: 74,
    age: '1 yr',
    photo: rabbitImage,
    stats: { Energy: 60, Affection: 70, Playfulness: 65, Independence: 55 },
    tags: ['Litter trained', 'Good with older kids'],
    bio: 'Curious, soft, and a little sassy. Pepper has been waiting for someone to notice those ears and that perfectly tidy personality.',
    careGuide: {
      lifespan: '9-12 years',
      exerciseNeeds: '3+ hours daily free roaming/play',
      diet: 'Timothy hay (main diet), vegetables, pellets',
      costs: '$25-40/month for food & bedding',
      specialNeeds: 'Quiet space, rabbit-proofed room, exotic vet access',
    },
    readinessChecklist: [
      '✓ Large enclosure or rabbit-proofed room',
      '✓ Timothy hay (bulk supply)',
      '✓ Litter box & pellets',
      '✓ Fresh vegetables (carrots, lettuce, spinach)',
      '✓ Hay rack to prevent waste',
      '✓ Hiding spots & boxes',
      '✓ Chew toys for dental health',
      '✓ Exotic animal veterinarian contact',
    ],
  },
  {
    id: 'nacho',
    name: 'Nacho',
    species: 'dog',
    rarity: 'rare',
    cp: 85,
    age: '5 yrs',
    photo: dog2Image,
    stats: { Energy: 55, Affection: 95, Playfulness: 60, Independence: 40 },
    tags: ['Special needs', 'No stairs'],
    bio: 'Nacho lost a leg before we found him, but it never slowed the tail wagging. He needs a single-level home and a lot of love.',
    careGuide: {
      lifespan: '10-12 years',
      exerciseNeeds: 'Gentle walks & play (adapted for mobility)',
      diet: 'High-quality dog food (2 cups/day)',
      costs: '$60-120/month (includes special vet care)',
      specialNeeds: 'Single-level home, mobility support, regular physical therapy',
    },
    readinessChecklist: [
      '✓ Single-level home (NO stairs)',
      '✓ Ramps or steps for furniture access',
      '✓ Non-slip flooring',
      '✓ Food & water bowls (elevated)',
      '✓ Orthopedic dog bed',
      '✓ Physical therapy/recovery plan',
      '✓ Veterinary specialist for amputee care',
      '✓ Patience & commitment to special needs',
    ],
  },
  {
    id: 'olive',
    name: 'Olive',
    species: 'cat',
    rarity: 'common',
    cp: 88,
    age: '6 months',
    photo: cat2Image,
    stats: { Energy: 85, Affection: 70, Playfulness: 95, Independence: 30 },
    tags: ['New arrival', 'Good with other cats'],
    bio: 'A kitten who treats every box, bag, and shoelace as a personal mission. Best adopted with another young cat for a playmate.',
    careGuide: {
      lifespan: '15-20 years',
      exerciseNeeds: 'High play & enrichment (toys, climbing)',
      diet: 'Kitten formula (4 meals/day now, 2 as adult)',
      costs: '$25-50/month plus vaccinations & spay/neuter',
      specialNeeds: 'Adoption with a playmate recommended, secure environment',
    },
    readinessChecklist: [
      '✓ Litter box (kitten-sized)',
      '✓ Kitten food & water bowls',
      '✓ Scratching post',
      '✓ Interactive toys & climbing structure',
      '✓ Safe hiding spots',
      '✓ Kitten-proofed home (remove hazards)',
      '✓ Vaccination & spay/neuter appointment',
      '✓ Consider adopting a second kitten (playmate)',
    ],
  },
]

const RARITY = {
  common: {
    label: 'Common',
    stars: '★',
    color: 'var(--peach)',
    holo: 0.1,
    badgeText: '#1c1a17',
  },
  uncommon: {
    label: 'Uncommon',
    stars: '★★',
    color: 'var(--yellow)',
    holo: 0.16,
    badgeText: '#1c1a17',
  },
  rare: {
    label: 'Rare',
    stars: '★★★',
    color: 'var(--coral)',
    holo: 0.26,
    badgeText: '#ffffff',
  },
  legendary: {
    label: 'Legendary',
    stars: '★★★★',
    color: 'var(--orange)',
    holo: 0.42,
    badgeText: '#ffffff',
  },
}

const SPECIES_LABELS = {
  all: 'All',
  dog: 'Dogs',
  cat: 'Cats',
  rabbit: 'Rabbits',
  bird: 'Birds',
}

const APPLICATION_STATUS_STEPS = [
  {
    id: 'submitted',
    title: 'Application received',
    detail: 'Your form is in the shelter queue and being paired with the right team.',
  },
  {
    id: 'review',
    title: 'In review',
    detail: 'A coordinator is checking your match details and home setup.',
  },
  {
    id: 'meet-and-greet',
    title: 'Meet & greet prep',
    detail: 'The shelter is preparing a visit so you can meet your new friend.',
  },
  {
    id: 'ready',
    title: 'Ready for home',
    detail: 'Final approval is near. We’ll confirm a pickup plan soon.',
  },
]

function statRow(label, value) {
  return (
    <div className="stat-row">
      <span className="slabel">{label}</span>
      <span className="stat-track">
        <span className="stat-fill" style={{ width: `${value}%` }} />
      </span>
      <span className="sval">{value}</span>
    </div>
  )
}

function CardFrame({ pet, showButton = true, onAdopt, interactive = false, isFavorite = false, onToggleFav, isExpanded = false, onToggleCareGuide, isReserved = false }) {
  const r = RARITY[pet.rarity]

  const [tilt, setTilt] = useState({
    rx: '0deg',
    ry: '0deg',
    mx: '50%',
    my: '50%',
  })

  const onMove = (event) => {
    if (!interactive) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    setTilt({
      rx: `${(py - 0.5) * -12}deg`,
      ry: `${(px - 0.5) * 12}deg`,
      mx: `${px * 100}%`,
      my: `${py * 100}%`,
    })
  }

  const onLeave = () => {
    if (!interactive) return
    setTilt({
      rx: '0deg',
      ry: '0deg',
      mx: '50%',
      my: '50%',
    })
  }

  return (
    <div
      className={`card-frame ${pet.rarity} ${isReserved ? 'reserved' : ''}`}
      style={{
        '--holo': r.holo,
        '--rx': tilt.rx,
        '--ry': tilt.ry,
        '--mx': tilt.mx,
        '--my': tilt.my,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="holo-sheen" />
      {isReserved && <div className="reserved-badge">Reserved</div>}
      <div className="ribbon">NEEDS YOU</div>
      <button
        className="fav-btn"
        onClick={() => onToggleFav?.(pet.id)}
        aria-label="Add to favorites"
        type="button"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <div className="card-topbar">
        <div className="rarity-badge" style={{ background: r.color, color: r.badgeText }}>
          {r.stars} {r.label}
        </div>
        <div className="cp-badge">⚡ {pet.cp} CP</div>
      </div>

      <h3 className="card-name display">{pet.name}</h3>
      <p className="card-meta">
        {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)} · {pet.age}
      </p>

      <div className="card-art" style={{ background: `var(--${pet.species})` }}>
        <img src={pet.photo} alt={`${pet.name} the ${pet.species}`} loading="lazy" />
      </div>

      <div className="card-stats">
        {statRow('Energy', pet.stats.Energy)}
        {statRow('Affection', pet.stats.Affection)}
        {statRow('Playful', pet.stats.Playfulness)}
        {statRow('Independent', pet.stats.Independence)}
      </div>

      <div className="card-footer">
        <div className="tag-row">
          {pet.tags.map((tag) => (
            <span key={tag} className="tag" style={{ background: r.color, color: r.badgeText }}>
              {tag}
            </span>
          ))}
        </div>
        <p className="bio">{pet.bio}</p>
        
        {pet.careGuide && (
          <div>
            <button
              type="button"
              className="btn btn-small"
              onClick={() => onToggleCareGuide?.(pet.id)}
              style={{ width: '100%', marginBottom: '8px' }}
            >
              {isExpanded ? '▼ Hide Care Guide' : '▶ View Care Guide'}
            </button>
            {isExpanded && (
              <div style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '8px',
                marginBottom: '12px',
                fontSize: '0.9rem',
              }}>
                <p><strong>Lifespan:</strong> {pet.careGuide.lifespan}</p>
                <p><strong>Daily Exercise:</strong> {pet.careGuide.exerciseNeeds}</p>
                <p><strong>Diet:</strong> {pet.careGuide.diet}</p>
                <p><strong>Monthly Cost:</strong> {pet.careGuide.costs}</p>
                <p><strong>Special Needs:</strong> {pet.careGuide.specialNeeds}</p>
              </div>
            )}
          </div>
        )}
        
        {showButton ? (
          <button type="button" className="btn btn-primary adopt-btn" onClick={() => onAdopt?.(pet.id)}>
            {isReserved ? `Continue with ${pet.name}` : `Adopt ${pet.name} →`}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function App() {
  const [filter, setFilter] = useState('all')
  const [heroIndex, setHeroIndex] = useState(0)
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [petSelect, setPetSelect] = useState(PETS[0].id)
  const [applicantMessage, setApplicantMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({ energy: 0, affection: 0, home: '' })
  const [quizMatches, setQuizMatches] = useState(null)
  const [showReadiness, setShowReadiness] = useState(false)
  const [selectedPetForReadiness, setSelectedPetForReadiness] = useState(null)
  const [reservedPetId, setReservedPetId] = useState(null)
  const [adoptionToast, setAdoptionToast] = useState('')
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [applicationStatusIndex, setApplicationStatusIndex] = useState(-1)
  const [showFavorites, setShowFavorites] = useState(false)
  const [matchedPetId, setMatchedPetId] = useState(null)
  const [expandedCareGuide, setExpandedCareGuide] = useState(null)
  const readinessRef = useRef(null)

  const heroOrder = useMemo(() => [...PETS].sort((a, b) => b.cp - a.cp), [])
  const heroPet = heroOrder[heroIndex]

  const visiblePets = useMemo(
    () => PETS.filter((pet) => filter === 'all' || pet.species === filter),
    [filter],
  )

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroOrder.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [heroOrder.length])

  useEffect(() => {
    if (!showReadiness) return

    const frame = window.requestAnimationFrame(() => {
      readinessRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [showReadiness])

  const handleAdopt = (id) => {
    const pet = PETS.find((p) => p.id === id)
    if (!pet) return

    setSelectedPetForReadiness(pet)
    setReservedPetId(id)
    setMatchedPetId(id)
    setAdoptionToast(`A rescue hero just chose ${pet.name}! Preparing your adoption mission…`)
    setShowReadiness(true)
  }

  const closeReadiness = () => {
    setShowReadiness(false)
    setReservedPetId(null)
    setSelectedPetForReadiness(null)
    setAdoptionToast('')
  }

  useEffect(() => {
    if (!adoptionToast) return undefined
    const timer = window.setTimeout(() => {
      setAdoptionToast('')
    }, 2400)
    return () => window.clearTimeout(timer)
  }, [adoptionToast])

  const revealApplicationForm = () => {
    setShowApplyForm(true)
    setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.getElementById('applicantName')?.focus()
    }, 100)
  }

  const proceedToApplication = () => {
    if (selectedPetForReadiness) {
      setPetSelect(selectedPetForReadiness.id)
      setMatchedPetId(selectedPetForReadiness.id)
      setAdoptionToast(`Good call. ${selectedPetForReadiness.name} is reserved and ready for your application.`)
      setShowReadiness(false)
      revealApplicationForm()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setReservedPetId(null)
    setApplicationStatusIndex(0)
    setMatchedPetId(petSelect)
    setAdoptionToast(`Application sent! We’ll follow up on ${PETS.find((pet) => pet.id === petSelect)?.name || 'your chosen pet'} within 2 business days.`)
    setShowCelebration(true)
    window.setTimeout(() => setShowCelebration(false), 6000)
    setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const advanceApplicationStatus = () => {
    setApplicationStatusIndex((current) => Math.min(current + 1, APPLICATION_STATUS_STEPS.length - 1))
  }

  const resetApplicationStatus = () => {
    setApplicationStatusIndex(-1)
  }

  const toggleFavorite = (petId) => {
    setFavorites((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    )
  }

  const handleQuizSubmit = () => {
    const matches = PETS.filter((pet) => {
      const energyMatch =
        (quizAnswers.energy > 70 && pet.stats.Energy > 60) ||
        (quizAnswers.energy < 30 && pet.stats.Energy < 40) ||
        (quizAnswers.energy >= 30 && quizAnswers.energy <= 70)
      const affectionMatch =
        (quizAnswers.affection > 80 && pet.stats.Affection > 70) ||
        (quizAnswers.affection < 50 && pet.stats.Affection < 60) ||
        (quizAnswers.affection >= 50 && quizAnswers.affection <= 80)
      const homeMatch =
        (quizAnswers.home === 'apartment' && pet.stats.Independence > 50) ||
        (quizAnswers.home === 'house' && pet.rarity !== 'rare') ||
        (quizAnswers.home === 'farm')
      return energyMatch && affectionMatch && homeMatch
    }).slice(0, 3)

    setQuizMatches(matches)
  }

  const getRandomPet = () => {
    const randomPet = PETS[Math.floor(Math.random() * PETS.length)]
    setPetSelect(randomPet.id)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (!matchedPetId) return
    const element = document.querySelector(`[data-pet-id="${matchedPetId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [matchedPetId])

  const favoritePets = PETS.filter((pet) => favorites.includes(pet.id))

  return (
    <div className="wrap">
      <header className="nav">
        <div className="brand">
          <div className="brand-badge" aria-hidden="true">
            🐾
          </div>
          <div>
            <div className="brand-name display">FOREVER DECK</div>
            <p className="brand-tag">Pet adoption</p>
          </div>
        </div>
        <div className="header-actions">
          <a href="#pets" className="btn btn-small">
            Meet the pets
          </a>
          <button type="button" className="btn btn-small btn-primary" onClick={revealApplicationForm}>
            Apply now
          </button>
        </div>
      </header>
      {adoptionToast && (
        <div className="adoption-toast" role="status">
          {adoptionToast}
        </div>
      )}

      <section className="hero" style={{ paddingTop: '8px' }}>
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Shelter Partner · Updated Weekly</span>
            <h1 className="display">
              Every pet here is one adoption away from <span>legendary</span>.
            </h1>
            <p className="lede">
              Each animal gets a card that shows energy, affection, play style, and urgency. The
              rarity system highlights the pets who have waited the longest for a home.
            </p>
            <div className="hero-ctas">
              <a href="#pets" className="btn btn-primary">
                Meet the pets →
              </a>
              <button type="button" className="btn btn-secondary" onClick={revealApplicationForm}>
                Apply now
              </button>
              <a href="#how" className="btn">
                How adoption works
              </a>
            </div>
          </div>
          <div className="hero-stage">
            <div className={`card-stage ${heroPet.rarity}`}>
              <CardFrame pet={heroPet} showButton={false} interactive isFavorite={favorites.includes(heroPet.id)} onToggleFav={toggleFavorite} isExpanded={expandedCareGuide === heroPet.id} onToggleCareGuide={(id) => setExpandedCareGuide(expandedCareGuide === id ? null : id)} isReserved={reservedPetId === heroPet.id} />
            </div>
            <span className="meet-line">
              Meet {heroPet.name} - {RARITY[heroPet.rarity].label}
            </span>
          </div>
        </div>
      </section>

      <section className="rarity-strip" id="rarity">
        <div className="rarity-strip-inner">
          <div className="rarity-chip rc-common">
            <div className="stars">★</div>
            <div className="rname">Common</div>
            <div className="rdesc">New arrival - adopts fast</div>
          </div>
          <div className="rarity-chip rc-uncommon">
            <div className="stars">★★</div>
            <div className="rname">Uncommon</div>
            <div className="rdesc">Been waiting a few weeks for the right match</div>
          </div>
          <div className="rarity-chip rc-rare">
            <div className="stars">★★★</div>
            <div className="rname">Rare</div>
            <div className="rdesc">Senior or special-needs - needs an experienced home</div>
          </div>
          <div className="rarity-chip rc-legendary">
            <div className="stars">★★★★</div>
            <div className="rname">Legendary</div>
            <div className="rdesc">Longtime resident - has waited the longest for you</div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="section-head">
          <h2 className="display">How adoption works</h2>
          <p>Three steps, start to finish.</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="num mono">01</div>
            <h3>Browse the deck</h3>
            <p>Filter by species and read each pet's card. Stats, needs, and personality are all visible.</p>
          </div>
          <div className="step">
            <div className="num mono">02</div>
            <h3>Meet &amp; apply</h3>
            <p>Tap Adopt me on a card to send the application to that exact pet.</p>
          </div>
          <div className="step">
            <div className="num mono">03</div>
            <h3>Bring them home</h3>
            <p>Our team follows up within 2 business days to schedule a meet-and-greet.</p>
          </div>
        </div>
      </section>

      <section id="pets">
        <div className="section-head">
          <h2 className="display">Available pets</h2>
          <p>Six animals looking for a home right now. Each card is styled with a rarity tier.</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button type="button" className="btn btn-small" onClick={() => setShowQuiz(true)}>
              🎯 Find your match
            </button>
            <button type="button" className="btn btn-small" onClick={getRandomPet}>
              🎲 Pull a pack
            </button>
            <button
              type="button"
              className="btn btn-small"
              onClick={() => setShowFavorites((prev) => !prev)}
              disabled={favorites.length === 0}
            >
              ❤️ {showFavorites ? 'Hide deck' : `My Deck (${favorites.length})`}
            </button>
          </div>
        </div>

        <div className="filters" id="filters">
          {Object.entries(SPECIES_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`filter-pill ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {showFavorites && (
          <section className="favorites-section">
            <div className="section-head">
              <h3 className="display">Your Deck</h3>
              <p>Favorites are pinned here so you can compare your top picks with the full adoption deck.</p>
            </div>
            {favoritePets.length > 0 ? (
              <div className="pet-grid" id="petGridFavorites">
                {favoritePets.map((pet) => (
                  <div className={`card-stage ${matchedPetId === pet.id ? 'matched-card' : ''}`} data-pet-id={pet.id} key={pet.id}>
                    <CardFrame
                      pet={pet}
                      onAdopt={handleAdopt}
                      interactive
                      isFavorite={favorites.includes(pet.id)}
                      onToggleFav={toggleFavorite}
                      isExpanded={expandedCareGuide === pet.id}
                      onToggleCareGuide={(id) => setExpandedCareGuide(expandedCareGuide === id ? null : id)}
                      isReserved={reservedPetId === pet.id}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: 'rgba(28,26,23,0.65)' }}>No favorites yet. Start adding pets to your deck!</p>
            )}
          </section>
        )}

        <div className="pet-grid" id="petGrid">
          {visiblePets.map((pet) => (
            <div className={`card-stage ${matchedPetId === pet.id ? 'matched-card' : ''}`} data-pet-id={pet.id} key={pet.id}>
              <CardFrame
                pet={pet}
                onAdopt={handleAdopt}
                interactive
                isFavorite={favorites.includes(pet.id)}
                onToggleFav={toggleFavorite}
                isExpanded={expandedCareGuide === pet.id}
                onToggleCareGuide={(id) => setExpandedCareGuide(expandedCareGuide === id ? null : id)}
                isReserved={reservedPetId === pet.id}
              />
            </div>
          ))}
        </div>
      </section>

      {showQuiz && (
        <div className="quiz-popup-backdrop" role="dialog" aria-modal="true" aria-labelledby="findMatchTitle">
          <div className="quiz-popup">
            <button
              type="button"
              className="btn btn-small popup-close"
              onClick={() => { setShowQuiz(false); setQuizStep(0); setQuizMatches(null); }}
              aria-label="Close match finder"
            >
              ✕
            </button>
            <div className="panel" style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 className="display" id="findMatchTitle" style={{ marginTop: 0 }}>Find Your Perfect Match</h2>

              {!quizMatches && (
                <>
                  {quizStep === 0 && (
                    <div>
                      <p style={{ marginBottom: '16px' }}>What's your activity level?</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['Low (0)', 'Medium (50)', 'High (100)'].map((level, idx) => (
                          <button
                            key={level}
                            type="button"
                            className={`filter-pill ${quizAnswers.energy === idx * 50 ? 'active' : ''}`}
                            onClick={() => {
                              setQuizAnswers({ ...quizAnswers, energy: idx * 50 })
                              setQuizStep(1)
                            }}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 1 && (
                    <div>
                      <p style={{ marginBottom: '16px' }}>How affectionate do you want a pet?</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['Chill (30)', 'Balanced (60)', 'Cuddly (90)'].map((level, idx) => (
                          <button
                            key={level}
                            type="button"
                            className={`filter-pill ${quizAnswers.affection === idx * 30 + 30 ? 'active' : ''}`}
                            onClick={() => {
                              setQuizAnswers({ ...quizAnswers, affection: idx * 30 + 30 })
                              setQuizStep(2)
                            }}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div>
                      <p style={{ marginBottom: '16px' }}>What's your living situation?</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['Apartment', 'House', 'Farm'].map((home) => (
                          <button
                            key={home}
                            type="button"
                            className={`filter-pill ${quizAnswers.home === home.toLowerCase() ? 'active' : ''}`}
                            onClick={() => {
                              setQuizAnswers({ ...quizAnswers, home: home.toLowerCase() })
                              handleQuizSubmit()
                            }}
                          >
                            {home}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {quizMatches && (
                <div>
                  <h3 style={{ marginTop: 0 }}>Your matches:</h3>
                  {quizMatches.length > 0 ? (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {quizMatches.map((pet) => (
                        <div key={pet.id} style={{
                          padding: '12px',
                          border: '2px solid var(--ink)',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div>
                            <strong>{pet.name}</strong> — {pet.species} ({RARITY[pet.rarity].label})
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary btn-small"
                            onClick={() => {
                              handleAdopt(pet.id)
                              setShowQuiz(false)
                            }}
                          >
                            Meet →
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No exact matches found. Try adjusting your preferences!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showReadiness && selectedPetForReadiness && (
        <section
          ref={readinessRef}
          id="readiness"
          style={{
          padding: '50px 0',
          background: 'var(--cream)',
          borderTop: '3px solid var(--ink)',
          borderBottom: '3px solid var(--ink)',
        }}
        >
          <div className="panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button
              type="button"
              className="btn btn-small"
              onClick={closeReadiness}
              style={{ float: 'right', marginBottom: '16px' }}
            >
              ✕ Close
            </button>
            <h2 className="display" style={{ marginTop: 0 }}>Mission briefing: {selectedPetForReadiness.name}</h2>
            <p style={{ color: 'rgba(28,26,23,0.85)', marginBottom: '16px' }}>
              You’ve matched with {selectedPetForReadiness.name}. This rescue briefing shows the essentials for making their first day home a success.
            </p>
            <p style={{ color: 'rgba(28,26,23,0.7)', marginBottom: '24px', fontStyle: 'italic' }}>
              “{selectedPetForReadiness.bio}”
            </p>

            <div style={{
              background: 'var(--paper)',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid var(--ink)',
              marginBottom: '24px',
            }}>
              {selectedPetForReadiness.readinessChecklist.map((item, idx) => (
                <div key={idx} style={{
                  padding: '8px 0',
                  borderBottom: idx < selectedPetForReadiness.readinessChecklist.length - 1 ? '1px solid rgba(28,26,23,0.2)' : 'none',
                  fontSize: '0.95rem',
                }}>
                  {item}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={proceedToApplication}
              >
                ✓ I'm Ready - Let's Start the Application
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setShowReadiness(false)}
              >
                ✗ Not Yet - Go Back
              </button>
            </div>
          </div>
        </section>
      )}

      <section id="apply">
        <div className="section-head">
          <h2 className="display">Apply to adopt</h2>
          <p>Tell us a little about you and who you'd like to meet.</p>
        </div>

        <div className="panel" style={{ marginBottom: '28px' }}>
          <p style={{ marginBottom: '18px', color: 'rgba(28,26,23,0.82)' }}>
            Start your application for {PETS.find((pet) => pet.id === petSelect)?.name || 'your chosen pet'}.
          </p>
          {!showApplyForm ? (
            <button type="button" className="btn btn-primary" onClick={revealApplicationForm}>
              Start application
            </button>
          ) : (
            <button type="button" className="btn" onClick={() => setShowApplyForm(false)}>
              Hide application
            </button>
          )}
        </div>

        {showApplyForm && (
          <form className="panel" id="applyForm" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="applicantName">Your name</label>
            <input
              type="text"
              id="applicantName"
              required
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="applicantEmail">Email</label>
            <input
              type="email"
              id="applicantEmail"
              required
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="applicantPhone">Phone (optional)</label>
            <input
              type="tel"
              id="applicantPhone"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="petSelect">Which pet?</label>
            <select id="petSelect" value={petSelect} onChange={(e) => setPetSelect(e.target.value)}>
              {PETS.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.species})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="applicantMessage">Tell us about your home</label>
            <textarea
              id="applicantMessage"
              placeholder="Yard, other pets, kids, experience with this species..."
              value={applicantMessage}
              onChange={(e) => setApplicantMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit application
          </button>
          <p className="form-note">
            This form is a front-end demo. Connect it to your shelter email or CRM to go live.
          </p>
          <p className="success" id="applySuccess" style={{ display: submitted ? 'block' : 'none' }}>
            ✓ Thanks! We'll follow up within 2 business days.
          </p>
        </form>
        )}

        {showCelebration && (
          <div className="celebration-panel" role="status" aria-live="polite">
            <div className="celebration-sparkles" aria-hidden="true">
              <span className="sparkle" />
              <span className="sparkle" />
              <span className="sparkle" />
              <span className="sparkle" />
              <span className="sparkle" />
            </div>
            <div>
              <h3>🎉 Adoption mission launched!</h3>
              <p>
                Your application for {PETS.find((pet) => pet.id === petSelect)?.name || 'your chosen pet'} has been sent to the shelter team.
                They’re reviewing it now and will reach out soon to schedule a meet-and-greet.
              </p>
            </div>
          </div>
        )}

      </section>

      <footer>
        <div className="foot-inner">
          <span>Forever Deck - helping shelter pets get seen, one card at a time.</span>
          <span className="mono">© 2026</span>
        </div>
      </footer>
    </div>
  )
}
