module TypeScriptTD {


    export interface IWeapon {
        ShotTexture: string;
        TowerData;
        Level:number;

        CanFire();
        TargetAndFire(enemies: Array<EnemyInstance>, towerPos: Vector2, gridCellSize: number, session: GameScreen);
        Update(elapsedSeconds: number, session: GameScreen);
    }
}



