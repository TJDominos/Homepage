import svgPaths from "../../imports/svg-401s87trfk";
import imgImage5 from "figma:asset/06f51fd4908442ab707a9531c9bd497dc34c71e2.png";

export function Header() {
  return (
    <header className="flex-shrink-0 bg-gradient-to-r from-[#D5D6F7] via-[#E1E2F9] to-[#D3C3FB] border-b border-purple-200/30 shadow-sm">
      <div className="max-w-[1024px] mx-auto px-6 py-2">
        <div className="flex items-center justify-between relative">
          {/* Left - Logo */}
          <img
            src={imgImage5}
            alt="Randseed Logo"
            className="w-8 h-8"
          />
          
          {/* Center - Brand Name */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-lg font-bold tracking-wide text-black">
              Randseed
            </h1>
          </div>

          {/* Right - Community Button */}
          <a
            href="/community/wltoken"
            target="_blank"
            className="flex items-center gap-2 border-2 border-black rounded-full px-4 py-1.5 hover:bg-black hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 14 14.069"
            >
              <path
                d={svgPaths.p3033a600}
                fill="currentColor"
              />
            </svg>
            Community
          </a>
        </div>
      </div>
    </header>
  );
}