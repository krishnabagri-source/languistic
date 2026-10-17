import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import { AnalysisResults } from '@/components/AnalysisResults';
import { GuidedAnalysisForm } from '@/components/GuidedAnalysisForm';
import { LandingExperience } from '@/components/LandingExperience';
import { examples } from '@/data/examples';
import { analysisService } from '@/services/analysisService';
import type { AnalysisRequest, AnalysisResult, Barrier, Goal, ReadinessChoice, ResponseOption, Scenario, Tone } from '@/types';
import './app.css';

const queryClient = new QueryClient();
type Page = 'home' | 'workspace' | 'results';
const defaultTone: Tone = 'Calm and neutral';

function BridgeBubbleMark() {
  return <svg viewBox="0 0 28 28" aria-hidden="true" className="bridge-bubble-mark">
    <path d="M5.2 5.8h17.2a2 2 0 0 1 2 2v10.1a2 2 0 0 1-2 2h-8.2l-5.4 4v-4H5.2a2 2 0 0 1-2-2V7.8a2 2 0 0 1 2-2Z" />
    <path d="M7.6 16c3.2-6.3 8.9-6.3 12.2 0" />
    <path d="M10.8 16v-2.1m5.8 2.1v-2.1" />
  </svg>;
}

function App() {
  const [page, setPage] = useState<Page>('home');
  const [message, setMessage] = useState('');
  const [scenario, setScenario] = useState<Scenario>();
  const [context, setContext] = useState('');
  const [meaning, setMeaning] = useState('');
  const [conveyText, setConveyText] = useState('');
  const [goal, setGoal] = useState<Goal>();
  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [selectedExampleId, setSelectedExampleId] = useState<string>();
  const [result, setResult] = useState<AnalysisResult>();
  const [responseOptions, setResponseOptions] = useState<ResponseOption[]>([]);
  const [request, setRequest] = useState<AnalysisRequest>();
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState<Tone>(defaultTone);
  const [revision, setRevision] = useState(0);
  const [toast, setToast] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reflection, setReflection] = useState('');
  const [selectedResponse, setSelectedResponse] = useState(0);
  const [readiness, setReadiness] = useState<ReadinessChoice>();
  const [error, setError] = useState('');

  const draft: AnalysisRequest = useMemo(() => ({
    message, exampleId: selectedExampleId, situation: scenario, context,
    perceivedMeaning: meaning, barriers, goal, conveyText, preferredTone: tone,
  }), [message, selectedExampleId, scenario, context, meaning, barriers, goal, conveyText, tone]);

  const notify = (text: string) => { setToast(text); window.setTimeout(() => setToast(''), 2400); };
  const start = () => { setPage('workspace'); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const reset = () => {
    setPage('home'); setMessage(''); setScenario(undefined); setContext(''); setMeaning(''); setConveyText(''); setGoal(undefined);
    setBarriers([]); setSelectedExampleId(undefined); setResult(undefined); setResponseOptions([]);
    setRequest(undefined); setTone(defaultTone); setRevision(0); setReflection(''); setSelectedResponse(0);
    setReadiness(undefined); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const clearExample = () => setSelectedExampleId(undefined);
  const fillExample = (id: string) => {
    const example = examples.find((item) => item.id === id);
    if (!example) return;
    setMessage(example.message); setScenario(example.situation); setContext(example.context);
    setMeaning(example.perceivedMeaning); setConveyText(example.conveyText); setGoal(example.goal);
    setBarriers(example.barriers); setSelectedExampleId(example.id); setError('');
  };
  const submit = async () => {
    if (!message.trim()) { setError('Add a message to continue.'); return; }
    setError(''); setLoading(true);
    const snapshot: AnalysisRequest = { ...draft, message: message.trim() };
    try {
      const nextResult = await analysisService.analyze(snapshot);
      setRequest(snapshot); setResult(nextResult); setResponseOptions(nextResult.responses);
      setTone(snapshot.preferredTone); setRevision(0); setSelectedResponse(0); setReadiness(undefined);
      setPage('results'); window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('That did not work just now. Please try again.');
    } finally { setLoading(false); }
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify('Copied to clipboard');
    } catch { notify('Clipboard is unavailable in this browser. You can select and copy the text.'); }
  };
  const toggleBarrier = (barrier: Barrier) => {
    clearExample();
    setBarriers((current) => current.includes(barrier) ? current.filter((item) => item !== barrier) : [...current, barrier]);
  };
  const setNav = (section: string) => {
    setMobileMenu(false);
    if (page !== 'home') { reset(); window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 80); }
    else document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };
  const updateTone = (nextTone: Tone) => {
    setTone(nextTone);
    if (!request) return;
    const nextRequest = { ...request, preferredTone: nextTone };
    setRequest(nextRequest);
    setResponseOptions(analysisService.createResponses(nextRequest, nextTone, revision));
  };
  const regenerate = (index: number) => {
    if (!request) return;
    const nextRevision = revision + 1;
    setRevision(nextRevision);
    const refreshed = analysisService.createResponses(request, tone, nextRevision);
    setResponseOptions((current) => current.map((option, currentIndex) => currentIndex === index ? refreshed[index] : option));
    notify('A fresh example is ready');
  };
  const editResponseFocus = () => {
    const textarea = document.getElementById(`response-${selectedResponse}`);
    textarea?.focus();
    textarea?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const updateConveyText = (value: string) => {
    setConveyText(value);
    setRequest((current) => current ? { ...current, conveyText: value } : current);
    setResult((current) => current ? { ...current, conveyText: value } : current);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary resetKey={page}>
          <div className="app-shell">
            <header className="nav">
              <button className="brand" onClick={reset} aria-label="FirstStep home" data-testid="link-home">
                <span className="brand-mark"><BridgeBubbleMark /></span><span>firststep<span className="brand-period">.</span></span>
              </button>
              <nav className={`nav-links ${mobileMenu ? 'nav-open' : ''}`} aria-label="Main navigation">
                <button onClick={() => setNav('how-it-works')} data-testid="link-how-it-works">How It Works</button>
                <button onClick={() => setNav('principles')} data-testid="link-principles">Our Principles</button>
                <button className="nav-mobile-cta" onClick={start}>Try FirstStep <ArrowRight size={15} /></button>
              </nav>
              <div className="nav-actions">
                <button className="button button-primary button-small" onClick={start} data-testid="button-try-now">Try FirstStep <ArrowRight size={15} /></button>
                <button className="icon-button menu-trigger" aria-label={mobileMenu ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)} data-testid="button-mobile-menu">{mobileMenu ? <X size={20} /> : <Menu size={20} />}</button>
              </div>
            </header>

            {page === 'home' && <LandingExperience onStart={start} onNavigate={setNav} />}
            {page === 'workspace' && <GuidedAnalysisForm
              message={message}
              context={context}
              perceivedMeaning={meaning}
              conveyText={conveyText}
              scenario={scenario}
              goal={goal}
              barriers={barriers}
              preferredTone={tone}
              selectedExampleId={selectedExampleId}
              loading={loading}
              error={error}
              onMessageChange={(value) => { clearExample(); setMessage(value); setError(''); }}
              onContextChange={(value) => { clearExample(); setContext(value); }}
              onPerceivedMeaningChange={(value) => { clearExample(); setMeaning(value); }}
              onConveyTextChange={(value) => { clearExample(); setConveyText(value); }}
              onScenarioChange={(value) => { clearExample(); setScenario(value); }}
              onGoalChange={(value) => { clearExample(); setGoal(value); }}
              onToggleBarrier={toggleBarrier}
              onToneChange={(value) => { clearExample(); setTone(value); }}
              onSelectExample={fillExample}
              onClearMessage={() => { clearExample(); setMessage(''); setError(''); }}
              onSubmit={submit}
              onBack={reset}
            />}
            {page === 'results' && result && request && <AnalysisResults
              result={result}
              request={request}
              responses={responseOptions}
              tone={tone}
              selectedResponse={selectedResponse}
              reflection={reflection}
              readiness={readiness}
              onToneChange={updateTone}
              onSelectResponse={setSelectedResponse}
              onEditResponse={(index, text) => {
                if (selectedResponse !== index) setSelectedResponse(index);
                setResponseOptions((current) => current.map((option, currentIndex) => currentIndex === index ? { ...option, text } : option));
              }}
              onRegenerate={regenerate}
              onEditKnownFacts={(knownFacts) => setResult((current) => current ? { ...current, knownFacts } : current)}
              onEditGuesses={(guesses) => setResult((current) => current ? { ...current, guesses } : current)}
              onConveyChange={updateConveyText}
              onReflectionChange={setReflection}
              onReadinessChange={setReadiness}
              onCopy={copy}
              onBack={() => setPage('workspace')}
              onStartOver={reset}
              onEditResponseFocus={editResponseFocus}
            />}

            <footer className="footer">
              <div className="footer-main"><button className="brand footer-brand" onClick={reset}><span className="brand-mark"><BridgeBubbleMark /></span><span>firststep<span className="brand-period">.</span></span></button><p>Bridge the gap between what you feel<br />and what you want to say.</p><span className="footer-built">A communication-support prototype</span></div>
              <div className="footer-right"><button onClick={() => setNav('how-it-works')}>How It Works</button><button onClick={() => setNav('principles')}>Our Principles</button><button onClick={start}>Try FirstStep <ArrowRight size={13} /></button></div>
              <div className="footer-disclaimer">FirstStep supports communication and reflection. It does not replace professional advice or emergency support.</div>
            </footer>
            {toast && <div className="toast-message" role="status" data-testid="status-feedback"><Check size={16} />{toast}</div>}
            <Toaster />
          </div>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
