# FirstStep

FirstStep is a local communication-support prototype for the space between receiving a difficult message and deciding what to say. It separates literal words from possible interpretations, reflects on user-selected barriers, and offers editable local response examples. It is not therapy, diagnosis, emergency support, or a real AI system.

## Setup and development

This app uses the repository's React + Vite workspace and pnpm:

```sh
pnpm install
pnpm --filter @workspace/firststep dev
```

The supplied Vite configuration expects the workspace to provide `PORT` and `BASE_PATH` (as it does in the Replit development workflow). To make a production bundle:

```sh
pnpm --filter @workspace/firststep build
pnpm --filter @workspace/firststep typecheck
```

## Project structure

- `src/App.tsx` — shared state, page orchestration, navigation, service requests, and footer.
- `src/components/LandingExperience.tsx` — landing page, communication-barrier cards, four-step overview, and principles.
- `src/components/GuidedAnalysisForm.tsx` — typed message/context workflow, example selection, situation/barrier/goal/tone inputs.
- `src/components/AnalysisResults.tsx` — interpretations, barrier reflection, editable facts/assumptions and convey text, response editor, and readiness choice.
- `src/data/examples.ts` — six fictional example messages and their optional prefilled context.
- `src/data/responseTemplates.ts` — example-specific response starters, neutral fallback, tone openers, and goal additions.
- `src/types.ts` — shared typed analysis request/result, scenario, barrier, goal, tone, and readiness structures.
- `src/services/analysisService.ts` — local deterministic analysis, safety phrase checks, and response generation behind the replaceable `AnalysisService` interface.
- `src/app.css` — FirstStep component styling and responsive layouts.
- `src/index.css` — theme tokens, typography, focus treatment, and reduced-motion support.

Message content is kept in application memory only during the current session; it is not written to local storage or a database. Analysis uses local demonstration logic. It does not connect to a real AI service or send messages. Avoid entering identifying or highly sensitive information.

## Future service connection

The UI calls the typed `AnalysisService` boundary in `src/services/analysisService.ts`. A future server integration can implement the same `analyze` and `createResponses` contract using `AnalysisRequest` and `AnalysisResult` from `src/types.ts`; keep provider credentials on the server, not in the frontend. A database is not part of this prototype. If one is considered later, it should be a separate opt-in architecture decision with explicit data minimization, consent, retention, and deletion rules rather than a silent change to the current in-memory flow.
