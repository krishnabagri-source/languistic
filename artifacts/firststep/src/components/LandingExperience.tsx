import { ArrowDown, ArrowRight, Compass, HeartHandshake, MessageCircle, ShieldCheck } from 'lucide-react';

interface LandingExperienceProps {
  onStart: () => void;
  onNavigate: (section: string) => void;
}

export function LandingExperience({ onStart, onNavigate }: LandingExperienceProps) {
  return (
    <main className="landing page-enter">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> A little space before you reply</div>
          <h1>Some messages are hard to understand.<br /><em>Some feelings are hard to express.</em></h1>
          <p className="hero-text">FirstStep helps you navigate difficult conversations, understand possible meanings without jumping to conclusions, and find the words to express yourself with clarity and confidence.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={onStart} data-testid="button-start-message">Let's take the first step <ArrowRight size={17} /></button>
            <button className="button button-quiet" onClick={() => onNavigate('how-it-works')} data-testid="button-see-how">Explore how it works <ArrowDown size={16} /></button>
          </div>
          <div className="hero-note"><ShieldCheck size={15} /> You are in control. No response is sent without your permission.</div>
        </div>
        <div className="hero-art" aria-label="Preview of a message and a gentle structured analysis">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="preview-label"><span className="preview-dot" /> A moment to understand</div>
          <div className="message-preview">
            <div className="preview-top"><span className="avatar">J</span><span><b>Jordan</b><small>just now</small></span><span className="message-kebab">···</span></div>
            <p>“Fine, do whatever you want.”</p>
            <div className="message-reaction">A message that leaves room for questions</div>
          </div>
          <div className="analysis-preview">
            <div className="analysis-preview-head"><span className="mini-icon"><Compass size={16} /></span><b>A few possible readings</b><span className="demo-chip">DEMO</span></div>
            <div className="possibility"><span className="possibility-mark">01</span><span><b>They might be frustrated</b><small>The short wording could follow a disagreement.</small></span></div>
            <div className="possibility"><span className="possibility-mark">02</span><span><b>They may be stepping back</b><small>We cannot know without asking them.</small></span></div>
            <div className="preview-divider" />
            <div className="preview-response"><span className="response-spark">↳</span> “Could you tell me what you meant? I want to understand.”</div>
          </div>
          <div className="hero-stamp"><HeartHandshake size={17} /><span>On your terms,<br /><b>at your pace.</b></span></div>
        </div>
      </section>
      <section className="trust-line" aria-label="How FirstStep helps">
        <span>Local demonstration logic</span><i /><span>Not therapy. Not diagnosis.</span><i /><span>Your words stay yours.</span>
      </section>
      <section className="barriers-section" id="barriers">
        <div className="section-intro"><span className="section-kicker">When words feel difficult</span><h2>There can be a lot <em>between.</em></h2><p>These are common communication barriers, not labels. You may recognize one, several, or none.</p></div>
        <div className="barriers-grid">
          <article className="barrier-card"><span>01</span><h3>Fear of judgment</h3><p>Worry about how your words will land can make it hard to begin. FirstStep gives you room to draft without needing the perfect phrasing.</p></article>
          <article className="barrier-card"><span>02</span><h3>Fear of rejection</h3><p>Uncertainty about another person’s response can make reaching out feel risky. Explore a small first step that still feels like yours.</p></article>
          <article className="barrier-card"><span>03</span><h3>Overthinking messages</h3><p>A short message can leave space for many interpretations. Separate what was actually said from what is still a guess.</p></article>
          <article className="barrier-card"><span>04</span><h3>Difficulty expressing feelings</h3><p>It can take time to find words for what matters. Shape a response that reflects your own feelings and needs.</p></article>
          <article className="barrier-card"><span>05</span><h3>Fear of confrontation</h3><p>Concern about an argument can make honest communication feel harder. Consider calm wording, or choose to pause.</p></article>
          <article className="barrier-card"><span>06</span><h3>Difficulty setting boundaries</h3><p>Saying no can feel complicated when you care about the relationship. Practice a respectful boundary without pressure.</p></article>
        </div>
      </section>
      <section className="section how-section" id="how-it-works">
        <div className="section-intro"><span className="section-kicker">A gentler first step</span><h2>From stuck to <em>said.</em></h2><p>No perfect words required. Just a little room to work out what matters to you.</p></div>
        <div className="steps-grid">
          <article className="step-card"><span className="step-number">01</span><div className="step-icon lavender"><MessageCircle size={22} /></div><h3>Bring the message</h3><p>Share what they said and any context that feels useful. Leave out anything you would rather keep private.</p><span className="step-bottom">Start where you are <ArrowRight size={14} /></span></article>
          <article className="step-card"><span className="step-number">02</span><div className="step-icon blue"><Compass size={22} /></div><h3>Explore possible meanings</h3><p>Separate what the message says from what it might mean, without treating a guess as fact.</p><span className="step-bottom">Stay curious <ArrowRight size={14} /></span></article>
          <article className="step-card step-card-middle"><span className="step-number">03</span><div className="step-icon lavender"><HeartHandshake size={22} /></div><h3>Notice what’s getting in the way</h3><p>Choose a communication goal and name any barrier that feels relevant. Skip anything that does not.</p><span className="step-bottom">You choose what fits <ArrowRight size={14} /></span></article>
          <article className="step-card"><span className="step-number">04</span><div className="step-icon peach"><ArrowRight size={22} /></div><h3>Find your own words</h3><p>Prepare, edit, or set aside a response that feels authentic to you. Nothing is sent from here.</p><span className="step-bottom">You stay in control <ArrowRight size={14} /></span></article>
        </div>
      </section>
      <section className="principles-section" id="principles">
        <div className="principles-heading"><div><span className="section-kicker">What guides us</span><h2>Care without <em>certainty.</em></h2></div><p>Support should make more room for you, not make decisions on your behalf.</p></div>
        <div className="principles-grid">
          <article><span className="principle-num">01</span><Compass size={20} /><h3>Understanding</h3><p>Explore possible meanings without assuming you know the sender’s intentions.</p></article>
          <article><span className="principle-num">02</span><HeartHandshake size={20} /><h3>Emotional safety</h3><p>Take time to reflect without shame, pressure, or judgment.</p></article>
          <article><span className="principle-num">03</span><ShieldCheck size={20} /><h3>Accessible by design</h3><p>Readable, keyboard-friendly, and made to work across screen sizes.</p></article>
          <article><span className="principle-num">04</span><ArrowRight size={20} /><h3>Human control</h3><p>Choose, edit, or reject every suggestion. Nothing is sent automatically.</p></article>
        </div>
      </section>
      <section className="closing-cta"><div className="closing-orb" /><span className="section-kicker">Whenever you’re ready</span><h2>One message. One <em>first step.</em></h2><p>You do not have to figure it all out at once.</p><button className="button button-primary" onClick={onStart} data-testid="button-closing-cta">Start with a message <ArrowRight size={17} /></button></section>
    </main>
  );
}
