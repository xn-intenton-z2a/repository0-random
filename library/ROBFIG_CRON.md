ROBFIG_CRON

TABLE OF CONTENTS
1. Normalised extract: core behavior and configuration
2. Topics covered
3. Detailed technical details and API signatures
4. Supplementary implementation details and patterns
5. Reference signatures and types
6. Digest: source excerpts and retrieval details
7. Attribution and data sizes

1. Normalised extract: core behavior and configuration
- Purpose: robfig/cron is a Go scheduling library providing cron-style scheduling of functions or Job objects.
- Default parser: by default it accepts the standard cron spec where the first field is minute. Seconds support is opt-in via options (cron.WithSeconds or custom parser). Year field is not supported by the default parsers.
- Construction: construct a scheduler with cron.New(options...). Options configure parser, time zone (location), chain wrappers and logger.
- Job registration: add jobs using AddFunc(spec, func()) or AddJob(spec, Job). Both return an EntryID and may return an error if spec parsing fails.
- Execution model: Cron.Start() starts the scheduler in its own goroutine; Cron.Run() runs in the caller goroutine; Cron.Stop() stops the scheduler and returns a context.Context that is cancelled once running jobs complete.
- Scheduling semantics: schedule parsing delegates to a ScheduleParser. A Schedule implements Next(time.Time) time.Time; Next returns the next activation strictly after the given time. Non-existent dates (e.g., day-of-month 31 in April) yield zero Next and are skipped.
- Thread-safety: Cron is safe for concurrent use for operations like AddFunc/AddJob/Remove/Entries while running; Entries() returns a consistent snapshot.

2. Topics covered
- Construction and options (parser, timezone, chain, logger)
- Parser behavior and how to enable seconds field
- Job API: AddFunc, AddJob, Schedule, Remove, Entries, Entry lookup
- Runtime control: Start, Run, Stop and waiting for jobs to finish
- Schedule interface and required semantics (Next method)
- Job wrapping via Chain and JobWrapper to support panic recovery, logging, and concurrency control

3. Detailed technical details and API signatures
- Core types and interfaces (exact names):
  - type Cron struct { /* internal state: entries, chain, stop, add, remove, snapshot, running, logger, location, parser, nextID, jobWaiter */ }
  - type Job interface { Run() }
  - type Schedule interface { Next(time.Time) time.Time }
  - type EntryID int
  - type Entry struct { ID EntryID; Schedule Schedule; Next time.Time; Prev time.Time; WrappedJob Job; Job Job }

- Construction and options:
  - New(opts ...Option) *Cron
    - Options available: WithSeconds, WithParser, WithLocation/WithLogger, WithChain, WithLogger wrappers, WithPanicRecovery (via Chain), etc.
  - Parser examples (constructor pattern):
    - WithParser(NewParser(cron.SecondOptional | cron.Minute | cron.Hour | cron.Dom | cron.Month | cron.Dow | cron.Descriptor))
    - WithSeconds() opts into requiring/accepting a seconds field in expressions or exposes a parser that handles seconds.

- Registering jobs and scheduling:
  - (c *Cron) AddFunc(spec string, cmd func()) (EntryID, error)
    - Parses spec with c.parser.Parse(spec). On parse error returns error and 0 as EntryID.
  - (c *Cron) AddJob(spec string, cmd Job) (EntryID, error)
    - Wraps Job with c.chain.Then(cmd) internally and calls Schedule(schedule, cmd) if parsing succeeds.
  - (c *Cron) Schedule(schedule Schedule, cmd Job) EntryID
    - Adds an entry to Cron; returns a monotonically increasing EntryID.
  - (c *Cron) Remove(id EntryID)
    - Removes or requests removal depending on running state; safe to call concurrently.

- Runtime lifecycle and inspection:
  - (c *Cron) Start()
    - Starts scheduler in its own goroutine; idempotent.
  - (c *Cron) Run()
    - Runs scheduler in the calling goroutine; idempotent if already running.
  - (c *Cron) Stop() context.Context
    - Stops the scheduler and returns a Context that is cancelled when all running jobs finish; callers may wait on the returned context to know when shutdown completed.
  - (c *Cron) Entries() []Entry
    - Returns a snapshot of current entries; safe to call concurrently. When running, Entries() uses a channel snapshot mechanism that returns a copy.
  - (c *Cron) Entry(id EntryID) Entry
    - Returns a snapshot of the specific entry or zero Entry if not found.

- Scheduling semantics details:
  - The schedule.Next(t time.Time) time.Time method returns the next activation time strictly after t; entries with Next zero time are treated as unsatisfiable and are sorted to the end when selecting next run.
  - Cron maintains per-entry Next and Prev times.
  - Timer-based execution: Cron computes the earliest Next across entries and sleeps until that instant; upon wake it runs all entries whose Next <= now, updating their Prev and computing subsequent Next times.
  - Adding or removing entries while running signals the scheduler (channels add/remove) and triggers a recompute of next times.

4. Supplementary implementation details and patterns
- Parser design: Cron accepts a pluggable ScheduleParser with Parse(spec string) (Schedule, error). The library provides standard parsers and helpers to combine flags for supported fields (SecondOptional, Minute, Hour, Dom, Month, Dow, Descriptor).
- Chains and JobWrapper: Chain allows composing Job wrappers to modify runtime behavior. Typical wrappers include Recover (panic recovery), DelayIfStillRunning or SkipIfStillRunning (concurrency control), and logging wrappers.
- Concurrency and shutdown: Stop returns a Context; Cron uses a WaitGroup (jobWaiter) to track active jobs and cancels returned context when complete. Implementations should expose this pattern for graceful shutdown.
- Time zone: Cron has a location field; default is time.Local. For mission (UTC-only), set location to UTC when constructing Cron to guarantee consistent UTC computations.
- Deterministic iteration: Schedule.Next must be deterministic and efficient; Cron relies on correct Next implementations to compute future runs without scanning per-minute where avoidable.

5. Reference signatures and types (extracted from source)
- type Job interface { Run() }
- type Schedule interface { Next(time.Time) time.Time }
- type EntryID int
- func New(opts ...Option) *Cron
- func (c *Cron) AddFunc(spec string, cmd func()) (EntryID, error)
- func (c *Cron) AddJob(spec string, cmd Job) (EntryID, error)
- func (c *Cron) Schedule(schedule Schedule, cmd Job) EntryID
- func (c *Cron) Remove(id EntryID)
- func (c *Cron) Start()
- func (c *Cron) Run()
- func (c *Cron) Stop() context.Context
- func (c *Cron) Entries() []Entry
- func (c *Cron) Entry(id EntryID) Entry

6. Digest: source excerpts and retrieval details
- Primary source: robfig/cron README (GitHub raw). Retrieved: 2026-03-21T19:37:58.415Z. Bytes downloaded: 5173 bytes.
- Source code reference: cron.go (raw) from robfig/cron repository. Retrieved: 2026-03-21T19:37:58.415Z. Bytes downloaded: 8825 bytes.
- Extracted items: constructor semantics (New and options), AddFunc/AddJob/Schedule API, Start/Run/Stop lifecycle, Entries snapshot behavior, Schedule interface Next signature, chain/wrapper patterns, and notes on default parser semantics and seconds opt-in behavior.

7. Attribution and data sizes
- Source: https://github.com/robfig/cron and https://raw.githubusercontent.com/robfig/cron/master/README.md and cron.go
- Crawl date: 2026-03-21
- Data obtained during crawl: README raw 5173 bytes, cron.go raw 8825 bytes
- License: robfig/cron is MIT/BSD-style (see repository LICENSE) — this document contains derived, implementation-oriented extracts only and does not copy code.

USAGE NOTE (for mission implementers)
- Robfig's design is a useful pattern: separate parsing (ScheduleParser) from execution loop (Cron), expose a Schedule interface with Next(time.Time) time.Time, and allow job wrapping via Chain. For the JavaScript cron engine, mirror this separation: a parser that returns a Schedule/iterator object (with next() semantics), a scheduler/runner that manages entries and timers, and chainable wrappers for job execution behavior.
