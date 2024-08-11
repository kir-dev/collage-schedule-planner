import { cn } from '@/lib/utils';

export default function LandingNavbar() {
  return (
    <div className={cn('flex')}>
      <div
        className={cn(
          'w-[302px] h-screen bg-[#031C30] flex flex-col justify-between items-center shadow-[0px_9px_94px_rgba(0,0,0,0.15)] relative'
        )}
      >
        {/* Logo és cím - középre igazítás */}
        <div className={cn('flex flex-col items-center justify-center w-full pt-8')}>
          <div className={cn('flex items-center gap-x-4')}>
            <img src='/kirlogo.ico' alt='Logo' className={cn('w-[48px] h-[41px]')} />
            <div className={cn('text-white text-lg leading-tight')}>
              <h1>Collage Schedule</h1>
              <h2 className={cn('text-center')}>Planner</h2>
            </div>
          </div>
        </div>

        {/* Menü opciók */}
        <nav className={cn('flex flex-col w-full')}>
          <button className={cn('flex items-center gap-x-4 py-3 px-6 bg-[#4C566A] text-white w-full text-sm')}>
            <span className={cn('icon-home')} />
            Dashboard
          </button>
          <button className={cn('flex items-center gap-x-4 py-3 px-6 text-white w-full text-sm')}>
            <span className={cn('icon-pencil-alt')} />
            Event focus
          </button>
          <button className={cn('flex items-center gap-x-4 py-3 px-6 text-white w-full text-sm')}>
            <span className={cn('icon-chart-bar')} />
            Statistics
          </button>
          <button className={cn('flex items-center gap-x-4 py-3 px-6 text-white w-full text-sm')}>
            <span className={cn('icon-users')} />
            Groups
          </button>
        </nav>

        {/* Első szürke vonal */}
        <div className={cn('w-full h-[1px] bg-[#4C566A] ')} />

        {/* Hét megjelenítése */}
        <div className={cn('flex items-center justify-center w-full p-6')}>
          <div className={cn('relative bg-[#374151] text-white text-center rounded-lg w-full p-14')}>
            {/* Hátterkép */}
            <img
              src='/counterbg.png'
              alt='Background'
              className={cn('absolute inset-0 w-full h-full object-cover opacity-50')}
            />
            {/* Tartalom a kép előtt */}
            <h2 className={cn('relative text-5xl opacity-80')}>WEEK</h2>
            <p className={cn('relative text-4xl font-bold opacity-80')}>10</p>
          </div>
        </div>

        {/* Második szürke vonal */}
        <div className={cn('w-full h-[1px] bg-[#4C566A]')} />

        {/* Dark Mode és Logout */}
        <div className={cn('flex flex-col gap-y-4 w-full p-6')}>
          <div className={cn('flex items-center justify-between')}>
            <div className={cn('flex items-center gap-x-2 text-white')}>
              <span className={cn('icon-moon')} />
              <h1 className={cn('text-sm')}>Dark Mode</h1>
            </div>
            <div>
              <label className='switch'>
                <input type='checkbox' checked />
                <span className='slider round' />
              </label>
            </div>
          </div>
          <button className={cn('flex items-center gap-x-4 py-3 px-6 bg-[#4C566A] text-white w-full')}>
            <span className={cn('icon-logout')} />
            <h1 className={cn('text-sm')}>Logout</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
