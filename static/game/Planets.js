export class Planets {
	constructor() {
		const numPlanets = 300
		const imgs = [
			'/static/assets/planets/sun.png',
			'/static/assets/planets/dryhotplanet32x32.png',
			'/static/assets/planets/dryvenuslikeplane32x32t.png',
			'/static/assets/planets/exoplanet32x32.png',
			'/static/assets/planets/iceplanet32x32.png',
			'/static/assets/planets/moon27x26.png',
			'/static/assets/planets/neptunlikeplanet32x32.png',
			'/static/assets/planets/org_iceplanet.png',
			'/static/assets/planets/org_lava_planet.png',
			'/static/assets/planets/org_machine_world.png',
			'/static/assets/planets/org_shattered_planet.png',
			'/static/assets/planets/sphereplanet70x70.png'
		]
		this.planetTypes = []
		for(const img of imgs) {
			this.planetTypes.push(new Picture(new GameObject(-1800, 0, 100, 100, 30, 30), img))
		}

		this.planets = []
		for (let i = 0; i < numPlanets; i++) {
			const x = Random.integerBetween(-10000, 10000)
			const y = Random.integerBetween(-10000, 10000)
			const type = i % imgs.length;

			this.planets.push({ type, x, y })
		}
	}

	draw(ctx) {
		for (const pl of this.planets) {
			this.planetTypes[pl.type].gameObject.x = pl.x
			this.planetTypes[pl.type].gameObject.y = pl.y
			this.planetTypes[pl.type].draw(ctx)
		}
	}

	drawImage(ctx, image, position) {
		const aspectRatio = image.width / image.height

		const maxWidth = 800
		const maxHeight = 800

		let newWidth = maxWidth
		let newHeight = maxHeight

		if (image.width > maxWidth) {
			newWidth = maxWidth
			newHeight = newWidth / aspectRatio
		}

		if (newHeight > maxHeight) {
			newHeight = maxHeight
			newWidth = newHeight * aspectRatio
		}

		ctx.save()
		ctx.translate(position.x, position.y)
		ctx.drawImage(image, -newWidth / 2, -newHeight / 2, newWidth, newHeight)
		ctx.restore()
	}

}
