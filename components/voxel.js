import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { TernoSpinner, TernoContainer } from './voxel-terno-loader'

const Voxel = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()
  const urlTernoGLB = "/models/traje.glb"; //  Carga desde public/

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.toneMapping = THREE.NoToneMapping //  Evita alteraciones de color
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, scW / scH, 0.1, 1000)
      camera.position.set(0, 1.5, 3)
      camera.lookAt(0, 1, 0)

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2) 
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5) 
      directionalLight.position.set(5, 10, 5)
      scene.add(directionalLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target.set(0, 1, 0)

      loadGLTFModel(scene, urlTernoGLB, {
        receiveShadow: false,
        castShadow: false
      }).then(() => {
        setLoading(false)
        animate()
      })

      let req = null
      const animate = () => {
        req = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req)
        renderer.dispose()
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [handleWindowResize])

  return <TernoContainer ref={refContainer}>{loading && <TernoSpinner />}</TernoContainer>
}

export default Voxel
