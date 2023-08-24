import { Physics } from '/static/Physics.js'
import { Player } from '/static/Player.js'
import { Projectile } from '/static/Projectile.js'
import { Spaceship } from '/static/Spaceship.js'
import { VehicleModule } from '/static/VehicleModule.js'

export class Level {
	constructor(mouse) {

		this.player = new Player()
		this.objectToFollow = this.player

		this.spaceship = new Spaceship()

		this.projectile = new Projectile(this.player, 10, "red")

		this.physics = new Physics()
		this.physics.applyPhysics(this.player)
		this.physics.applyPhysics(this.spaceship)
		this.physics.applyPhysics(this.projectile)

		document.addEventListener('click', (e) => {
			this.projectile.shoot(this.player, mouse.positionRelativeToCamera(e))
		})

		this.vehicleModule = new VehicleModule(this.player, this.spaceship, this)
	}

	updatePhysics(deltaTime) {
		this.physics.update(deltaTime)
	}

	update() {
		this.spaceship.update()
		this.player.update()
		this.projectile.update()

		this.vehicleModule.update()

		if (this.projectile.connectedTo) {
			Physics.enforceMaxDistance(this.spaceship, this.player)
		}
	}

	drawCameraContext(ctx) {
		this.vehicleModule.draw(ctx)
		this.projectile.draw(ctx)
	}

}
