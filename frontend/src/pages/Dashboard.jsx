import { useId } from 'react'
import { Link } from 'react-router-dom'
import { sanitizeSvgIdFragment } from '../utils/svgIds'
import { Flame, Trophy, Zap, Plus } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/StatCard'
import { WorkoutCard } from '../components/WorkoutCard'
import { ProgressChart } from '../components/ProgressChart'

const MOCK_PROFILE = {
  heightCm: 178,
  weightKg: 76,
}

function computeBmi(weightKg, heightCm) {
  const m = heightCm / 100
  if (!m) return null
  return weightKg / (m * m)
}

export function Dashboard() {
  const bmiGradId = `bmi-grad-${sanitizeSvgIdFragment(useId())}`
  const bmi = computeBmi(MOCK_PROFILE.weightKg, MOCK_PROFILE.heightCm)
  const bmiRounded = bmi ? bmi.toFixed(1) : '—'
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const bmiFill =
    bmi == null ? 0 : Math.min(Math.max((bmi - 17) / (32 - 17), 0), 1)

  const bmiZone =
    bmi == null
      ? '—'
      : bmi < 18.5
        ? 'Underweight'
        : bmi < 25
          ? 'Healthy range'
          : bmi < 30
            ? 'Overweight'
            : 'Obesity range'

  const todayBlocks = [
    { name: 'Barbell Squat', detail: '4 × 6 · RPE 8', tag: 'Legs' },
    { name: 'Romanian Deadlift', detail: '3 × 8 · tempo 3-1-1', tag: 'Posterior' },
    { name: 'Walking Lunges', detail: '3 × 12 each leg', tag: 'Accessory' },
  ]

  return (
    <div className="page-dashboard">
      <section className="welcome-banner glass-card glass-card--hover">
        <div className="welcome-banner__intro">
          <p className="welcome-banner__eyebrow">Good afternoon</p>
          <h2 className="welcome-banner__title">Let’s dominate leg day</h2>
          <p className="welcome-banner__text">
            Your recovery score looks solid — progressive overload is on track this
            week.
          </p>
          <div className="welcome-banner__actions">
            <Link to="/workouts/add" className="btn btn-primary welcome-banner__cta">
              <Plus size={18} aria-hidden />
              Log Workout
            </Link>
            <Link to="/progress" className="btn btn-secondary welcome-banner__cta-secondary">
              View Progress
            </Link>
          </div>
        </div>
        <div className="welcome-banner__stats">
          <div>
            <span className="welcome-banner__label">Next session</span>
            <span className="welcome-banner__value">Lower Power · 45 min</span>
          </div>
          <div>
            <span className="welcome-banner__label">Focus</span>
            <span className="welcome-banner__value accent">Strength block · W3</span>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <Card className="bmi-card">
          <div className="bmi-card__header">
            <div>
              <p className="card-eyebrow">Body metrics</p>
              <h3 className="card-title">BMI overview</h3>
            </div>
            <span className="pill pill--green">{bmiZone}</span>
          </div>
          <div className="bmi-card__body">
            <div className="bmi-ring" aria-hidden>
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id={bmiGradId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
                <g transform="rotate(-90 60 60)">
                  <circle className="bmi-ring__track" cx="60" cy="60" r={radius} />
                  <circle
                    className="bmi-ring__progress"
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={`url(#${bmiGradId})`}
                    strokeDasharray={`${bmiFill * circumference} ${circumference}`}
                  />
                </g>
              </svg>
              <div className="bmi-ring__label">
                <span className="bmi-ring__value">{bmiRounded}</span>
                <span className="bmi-ring__unit">BMI</span>
              </div>
            </div>
            <dl className="bmi-meta">
              <div>
                <dt>Height</dt>
                <dd>{MOCK_PROFILE.heightCm} cm</dd>
              </div>
              <div>
                <dt>Weight</dt>
                <dd>{MOCK_PROFILE.weightKg} kg</dd>
              </div>
            </dl>
          </div>
        </Card>

        <StatCard
          icon={Zap}
          iconVariant="red"
          label="Total workouts"
          value="128"
          hint={
            <>
              <span className="text-success">+12%</span> vs last month
            </>
          }
        />

        <StatCard
          icon={Flame}
          iconVariant="amber"
          label="Calories burned"
          value="48.2k"
          hint={
            <>
              Est. from logged sessions ·{' '}
              <span className="text-muted">API placeholder</span>
            </>
          }
        />

        <StatCard
          icon={Trophy}
          iconVariant="green"
          label="Current streak"
          value="14 days"
          hint="Personal best · keep the chain"
        />
      </div>

      <section className="dashboard-split">
        <Card className="chart-card" hover={false}>
          <div className="chart-card__header">
            <div>
              <p className="card-eyebrow">Training load</p>
              <h3 className="card-title">Volume trend</h3>
            </div>
            <span className="pill">Last 12 weeks · UI preview</span>
          </div>
          <ProgressChart />
          <div className="chart-card__footer">
            <div>
              <span className="chart-card__metric-label">Weekly volume</span>
              <span className="chart-card__metric-value">+8.4%</span>
            </div>
            <div>
              <span className="chart-card__metric-label">Consistency</span>
              <span className="chart-card__metric-value text-success">Strong</span>
            </div>
          </div>
        </Card>

        <Card className="today-card">
          <div className="today-card__header">
            <div>
              <p className="card-eyebrow">Scheduled</p>
              <h3 className="card-title">Today’s workout</h3>
            </div>
            <span className="pill pill--outline">Est. 52 min</span>
          </div>
          <ul className="today-list">
            {todayBlocks.map((item) => (
              <li key={item.name}>
                <WorkoutCard
                  variant="compact"
                  title={item.name}
                  subtitle={item.detail}
                  tag={item.tag}
                />
              </li>
            ))}
          </ul>
          <Link to="/workouts/add" className="today-card__cta">
            <Plus size={18} aria-hidden />
            Add Workout
          </Link>
        </Card>
      </section>
    </div>
  )
}
