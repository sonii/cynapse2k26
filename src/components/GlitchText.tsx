import './GlitchText.css';

interface GlitchTextProps {
  children: React.ReactNode;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

const GlitchText = ({ 
  children, 
  speed = 1, 
  enableShadows = true, 
  enableOnHover = true, 
  className = '' 
}: GlitchTextProps) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-2px 0 hsl(var(--primary))' : 'none',
    '--before-shadow': enableShadows ? '2px 0 hsl(var(--accent))' : 'none'
  } as React.CSSProperties;

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <span 
      className={`glitch ${hoverClass} ${className}`}
      data-text={typeof children === 'string' ? children : ''}
      style={inlineStyles}
    >
      {children}
    </span>
  );
};

export default GlitchText;
