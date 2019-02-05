import sqlalchemy
from sqlalchemy import select
import json
import uuid
import time
import datetime
import random


def genDb():
    url = 'postgresql://{}:{}@{}:{}/{}'.format(
        'admin', 'admin', 'localhost', '5432', 'gamepal-dev'
    )

    connection = sqlalchemy.create_engine(url,
                                          client_encoding='utf8')
    meta = sqlalchemy.MetaData(bind=connection, reflect=True)
    timestamp = datetime.datetime.fromtimestamp(
        time.time()).strftime('%Y-%m-%d %H:%M:%S')
    timestamp += '+02'  # Append timezone.

    # Populate Games table.
    with open('./testDb/games.json') as gamesFile:
        games = json.load(gamesFile)['games']
        gamesTable = meta.tables['Games']

        for gameName in games:
            gameColor = games[gameName]['color']
            clause = gamesTable.insert().values(id=str(uuid.uuid4()),
                                                name=gameName,
                                                color=gameColor,
                                                createdAt=timestamp,
                                                updatedAt=timestamp)
            connection.execute(clause)

    usersTable = meta.tables['Users']
    userIds = [userId[0]
               for userId in connection.execute(select([usersTable.c.id]))]

    # Generate 100 games between the existing users in the database.
    for n_game in range(100):
        # Create two teams.
        teamsTable = meta.tables['Teams']
        teamOneId = str(uuid.uuid4())
        teamTwoId = str(uuid.uuid4())
        clause = teamsTable.insert().values(id=teamOneId,
                                            createdAt=timestamp,
                                            updatedAt=timestamp
                                            )
        connection.execute(clause)
        clause = teamsTable.insert().values(id=teamTwoId,
                                            createdAt=timestamp,
                                            updatedAt=timestamp
                                            )
        connection.execute(clause)

        # Assign existing users to teams.
        teamOneUsers = random.sample(userIds, 3)
        teamTwoUsers = []
        for i in range(3):
            for userId in userIds:
                if userId not in teamOneUsers:
                    teamTwoUsers.append(userId)
                    break

        teamMembersTable = meta.tables['TeamMembers']
        for teamMemberId in teamOneUsers:
            clause = teamMembersTable.insert().values(id=str(uuid.uuid4()),
                                                      userId=teamMemberId,
                                                      teamId=teamOneId,
                                                      createdAt=timestamp,
                                                      updatedAt=timestamp
                                                      )
            connection.execute(clause)

        for teamMemberId in teamTwoUsers:
            clause = teamMembersTable.insert().values(id=str(uuid.uuid4()),
                                                      userId=teamMemberId,
                                                      teamId=teamTwoId,
                                                      createdAt=timestamp,
                                                      updatedAt=timestamp
                                                      )
            connection.execute(clause)

        # Create match between the two teams.
        gameIds = [gameId[0]
                   for gameId in connection.execute(select([gamesTable.c.id]))]
        matchesTable = meta.tables['Matches']
        matchId = str(uuid.uuid4())
        clause = matchesTable.insert().values(id=matchId,
                                              gameId=random.choice(gameIds),
                                              date=timestamp,
                                              teamOneId=teamOneId,
                                              teamTwoId=teamTwoId,
                                              createdAt=timestamp,
                                              updatedAt=timestamp
                                              )
        connection.execute(clause)

        # Add ratings for every user in each team.
        ratingsTable = meta.tables['Ratings']
        posRatings = ['10', '20', '30', '40', '50',
                      '60', '70', '80', '90', '100']
        for teamMemberId in teamOneUsers:
            for ratedMemberId in teamOneUsers:
                if teamMemberId is ratedMemberId:
                    continue
                clause = ratingsTable.insert().values(id=str(uuid.uuid4()),
                                                      userId=teamMemberId,
                                                      ratedUserId=ratedMemberId,
                                                      matchId=matchId,
                                                      friendly=random.choice(
                                                          posRatings),
                                                      gteammate=random.choice(
                                                          posRatings),
                                                      helpful=random.choice(
                                                          posRatings),
                                                      createdAt=timestamp,
                                                      updatedAt=timestamp
                                                      )
                connection.execute(clause)

        for teamMemberId in teamTwoUsers:
            for ratedMemberId in teamTwoUsers:
                if teamMemberId is ratedMemberId:
                    continue
                clause = ratingsTable.insert().values(id=str(uuid.uuid4()),
                                                      userId=teamMemberId,
                                                      ratedUserId=ratedMemberId,
                                                      matchId=matchId,
                                                      friendly=random.choice(
                                                          posRatings),
                                                      gteammate=random.choice(
                                                          posRatings),
                                                      helpful=random.choice(
                                                          posRatings),
                                                      createdAt=timestamp,
                                                      updatedAt=timestamp
                                                      )
                connection.execute(clause)


if __name__ == '__main__':
    genDb()
