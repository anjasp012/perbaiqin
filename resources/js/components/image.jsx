import { useState } from 'react';
import { motion } from 'framer-motion';
import LazyLoad from 'react-lazy-load';
import { Skeleton } from './ui/skeleton';

export function Image({ className, alt, height, src, width }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleImageError = () => {
        setError(true);
        setLoading(false);
    };

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <LazyLoad height={height} width={width} threshold={0.95}>
            {error ? (
                <Skeleton  className={className} />
            ) : (
                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={className}
                    src={src}
                    alt={alt}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{
                        display: loading ? 'none' : 'block',
                        width,
                        height,
                        objectFit: 'cover',
                    }}
                />
            )}
        </LazyLoad>
    );
}
