const ob = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const animation = map.get(entry.target)
        if (animation) {
          animation.play()
          ob.unobserve(entry.target)
        }
      }
    }
  },
  { rootMargin: '0px 0px -150px 0px' }
)

const map = new WeakMap()

function isBelowViewport(el, distance) {
  const rect = el.getBoundingClientRect()
  return rect.top - distance > window.innerHeight
}

function getAnimationKeyframes(direction, distance, opacity) {
  switch (direction) {
    case 'up':
      return [
        { transform: `translateY(${distance}px)`, opacity },
        { transform: 'translateY(0)', opacity: 1 }
      ]
    case 'down':
      return [
        { transform: `translateY(-${distance}px)`, opacity },
        { transform: 'translateY(0)', opacity: 1 }
      ]
    case 'left':
      return [
        { transform: `translateX(${distance}px)`, opacity },
        { transform: 'translateX(0)', opacity: 1 }
      ]
    case 'right':
      return [
        { transform: `translateX(-${distance}px)`, opacity },
        { transform: 'translateX(0)', opacity: 1 }
      ]
    default:
      return [
        { transform: `translateY(${distance}px)`, opacity },
        { transform: 'translateY(0)', opacity: 1 }
      ]
  }
}

export default {
  mounted(el, binding) {
    const { distance = 150, duration = 500, direction = 'up', opacity = 0.5 } = binding.value || {}
    if (isBelowViewport(el, distance)) {
      return
    }
    const keyframes = [
      ...getAnimationKeyframes(direction, distance, opacity).map((frame) => ({
        ...frame
      }))
    ]

    const animation = el.animate(keyframes, {
      duration: duration,
      easing: 'ease-in-out',
      fill: 'forwards'
    })
    animation.pause()
    ob.observe(el)
    map.set(el, animation)
  },
  unmounted(el) {
    ob.unobserve(el)
    map.delete(el)
  }
}
