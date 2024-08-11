import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function LandingNavbar() {
  return (
    <div className={cn('flex flex-col md:flex-row')}>
      <div
        className={cn(
          'w-[270px] h-screen bg-[#031C30] flex flex-col justify-between items-center shadow-[0px_9px_94px_rgba(0,0,0,0.15)] relative'
        )}
      >
        {/* Logo és cím */}
        <div className={cn('flex flex-col items-center justify-center w-full pt-8')}>
          <div className={cn('flex items-center gap-x-3')}>
            <img src='/kirlogo.ico' alt='Logo' className={cn('w-[41px] h-[41px]')} />
            <div className={cn('text-white text-lg leading-tight')}>
              <h1 className={cn('text-center text-sm')}>Collage Schedule</h1>
              <h2 className={cn('text-center text-sm')}>Planner</h2>
            </div>
          </div>
        </div>

        {/* Menü opciók */}
        <nav className={cn('flex flex-col w-full mt-6')}>
          <button
            className={cn('flex items-center gap-x-4 py-2.5 px-5 bg-[#4C566A] text-white w-full text-sm rounded-md')}
          >
            <img src='/Home.png' alt='Dashboard' className={cn('w-5 h-5')} />
            Dashboard
          </button>
          <button className={cn('flex items-center gap-x-4 py-2.5 px-5 text-white w-full text-sm mt-2')}>
            <img src='/Edit%20Square.png' alt='Event focus' className={cn('w-5 h-5')} />
            Event focus
          </button>
          <button className={cn('flex items-center gap-x-4 py-2.5 px-5 text-white w-full text-sm mt-2')}>
            <img src='/Charts.png' alt='Statistics' className={cn('w-5 h-5')} />
            Statistics
          </button>
          <button className={cn('flex items-center gap-x-4 py-2.5 px-5 text-white w-full text-sm mt-2')}>
            <img src='/3%20User.png' alt='Groups' className={cn('w-5 h-5')} />
            Groups
          </button>
        </nav>

        {/* Első szürke vonal */}
        <div className={cn('w-[90%] h-[1px] bg-[#4C566A] mt-4')} />

        {/* Hét megjelenítése */}
        <div className={cn('flex items-center justify-center w-full py-6')}>
          <div
            className={cn(
              'relative bg-[#374151] text-white text-center rounded-lg h-[200px] w-[200px] flex items-center justify-center'
            )}
          >
            {/* Hátterkép */}
            <img
              src='/counterbg.png'
              alt='Background'
              className={cn('absolute inset-0 w-full h-full rounded-lg object-cover opacity-20')}
            />
            {/* Kép előtti szöveg */}
            <div className={cn('relative')}>
              <h2 className={cn('text-6xl opacity-80')}>WEEK</h2>
              <p className={cn('text-6xl font-light opacity-80')}>10</p>
            </div>
          </div>
        </div>

        {/* Második szürke vonal */}
        <div className={cn('w-[90%] h-[1px] bg-[#4C566A]')} />

        {/* Dark Mode és Logout */}
        <div className={cn('flex flex-col gap-y-4 w-full py-6 px-4')}>
          <div className={cn('flex items-center px-3 justify-between')}>
            <div className={cn('flex items-center gap-x-2 text-white')}>
              <img src='/Vector.png' alt='Dark Mode' className={cn('w-5 h-5')} />
              <h1 className={cn('text-sm')}>Dark Mode</h1>
            </div>
            <div>
              {/* Itt használjuk a switch komponenst */}
              <Switch defaultChecked />
            </div>
          </div>
          <button className={cn('flex items-center gap-x-3 py-2.5 px-5 bg-[#4C566A] text-white w-full rounded-md')}>
            <img src='/Logout.png' alt='Logout' className={cn('w-[20px] h-[20px]')} />
            <h1 className={cn('text-sm')}>Logout</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
